import {
  calculateDacAgenciaConta,
  ItauCnab400RemessaDetail1,
  ItauCnab400RemessaHeader,
  ItauCnab400RemessaRecord,
  ItauCnab400RemessaTrailer,
} from "./itau-400";
import {
  InvalidRecordFormatError,
  InvalidRecordTypeError,
  LineLengthError,
  UnsupportedLayoutError,
} from "./utils/errors";
import { Cnab } from "./utils/types";

// BMP CNAB 444 Types - Strictly per parse-cnab-444-bmp.mdc

export type BMPCnab444Header = {
  recordType: "0"; // Identificação do Registro
  remessaId: "1"; // Identificação do Arquivo Remessa
  remessaLiteral: "REMESSA"; // Literal Remessa
  serviceCode: "01"; // Código de Serviço
  serviceLiteral: "COBRANCA"; // Literal Serviço
  originatorCode: string; // Código do Originador (20)
  originatorName: string; // Nome do Originador (30)
  bankCode: "611"; // Número do Banco Paulista
  bankName: "PAULISTA S.A."; // Nome do Banco
  fileDate: string; // Data da Gravação do Arquivo (DDMMAA)
  blanks1: string; // Branco (8)
  systemId: "MX"; // Identificação do Sistema
  fileSequence: string; // N° Seqüencial do Arquivo (7)
  blanks2: string; // Branco (321)
  recordSequence: string; // N° Seqüencial do Registro (6)
};

export type BMPCnab444Detail = {
  recordType: "1"; // Identificação do Registro
  autoDebit: string; // Débito Automático C/C (19)
  coobligation: string; // Coobrigação (2)
  specialCharacteristic: string; // Característica Especial (2)
  operationModality: string; // Modalidade da Operação (4)
  operationNature: string; // Natureza da Operação (2)
  fundsOrigin: string; // Origem do recurso (4)
  riskClass: string; // Classe Risco da Operação (2)
  zeros1: string; // Zeros (1)
  participantControlNumber: string; // N° de Controle do Participante (25)
  chequeBankNumber: string; // Numero do Banco (3)
  zeros2: string; // Zeros (5)
  bankTitleId: string; // Identificação do Título no Banco (11)
  ourNumberDigit: string; // Dígito do Nosso Número (1)
  paidAmount: string; // Valor pago (10)
  paymentSlipCondition: string; // Condição para Emissão da Papeleta (1)
  paymentSlipDebit: string; // Ident. se emite papeleta para Débito (1)
  liquidationDate: string; // Data da Liquidação (6)
  bankOperationId: string; // Identificação da Operação do Banco (4)
  creditSplitIndicator: string; // Indicador Rateio Crédito (1)
  debitNoticeAddressing: string; // Endereçamento para Aviso do Débito (1)
  blanks1: string; // Branco (2)
  occurrenceId: string; // Identificação Ocorrência (2)
  documentNumber: string; // N° do Documento (10)
  dueDate: string; // Data do Vencimento do Título (6)
  faceValue: string; // Valor do Título (Face) (13)
  chargingBankCode: string; // Banco Encarregado da Cobrança (3)
  depositaryAgency: string; // Agência Depositária (5)
  titleSpecies: string; // Espécie de Título (2)
  identification: string; // Identificação (1)
  issueDate: string; // Data da emissão do Título (6)
  instruction1: string; // 1ª instrução (2)
  instruction2: string; // 2ª instrução (1)
  assignorPersonType: string; // Tipo de Pessoa do Cedente (2)
  zeros3: string; // Zeros (12)
  assignmentTermNumber: string; // Número do Termo de Cessão (19)
  presentValue: string; // Valor Presente da Parcela (13)
  discountValue: string; // Valor do Abatimento (13)
  payerIdType: string; // Identificação do tipo de Inscrição (2)
  payerId: string; // N° Inscrição do Sacado (14)
  payerName: string; // Nome do Sacado (40)
  payerAddress: string; // Endereço Completo (40)
  invoiceNumber: string; // Número da Nota Fiscal da Duplicata (9)
  invoiceSeries: string; // Numero da Série da Nota Fiscal (3)
  payerZipCode: string; // CEP (8)
  assignor: string; // Cedente (60)
  invoiceKey: string; // Chave da Nota (44)
  recordSequence: string; // N° Seqüencial do Registro (6)
};

export type BMPCnab444Trailer = {
  recordType: "9"; // Identificação Registro
  blanks: string; // Branco (437)
  recordSequence: string; // Número Seqüencial de Registro (6)
};

export type BMPCnab444Record =
  | BMPCnab444Header
  | BMPCnab444Detail
  | BMPCnab444Trailer;

const prefix = "CNAB 444 BMP";

/**
 * Faz o parsing de um arquivo CNAB 444 BMP (REMESSA) e retorna uma representação estruturada.
 *
 * @param input - O conteúdo do arquivo CNAB como string ou Buffer.
 * @returns Um objeto contendo o tipo, layout e as entradas parseadas.
 * @throws {UnsupportedLayoutError} Se a primeira linha não possuir 444 caracteres.
 * @throws {LineLengthError} Se alguma linha não corresponder ao tamanho esperado.
 * @throws {InvalidRecordTypeError} Se uma linha possuir um tipo de registro desconhecido.
 */
export function parse(input: string | Buffer): Cnab<BMPCnab444Record> {
  const entries: BMPCnab444Record[] = [];

  const content = Buffer.isBuffer(input) ? input.toString("utf-8") : input;

  // Split by \n or \r\n, remove empty lines
  const lines = content.split(/\r?\n/).filter((line) => line.trim().length > 0);

  const layout = lines[0].length;

  if (layout !== 444) {
    throw new UnsupportedLayoutError({
      prefix,
      lineContent: lines[0],
    });
  }

  let lineIndex = 0;

  for (const lineRaw of lines) {
    const line = lineRaw.replace(/\r?\n$/, "");

    if (line.length !== layout) {
      throw new LineLengthError({
        prefix,
        lineContent: line,
        lineNumber: lineIndex + 1,
      });
    }

    if (lineIndex === 0) {
      entries.push(parseHeader(line, lineIndex));
    } else if (line[0] === "1") {
      entries.push(parseDetail(line, lineIndex));
    } else if (line[0] === "9") {
      entries.push(parseTrailer(line, lineIndex));
    } else {
      throw new InvalidRecordTypeError({
        prefix,
        lineContent: line,
        lineNumber: lineIndex + 1,
        startCol: 0,
        endCol: 1,
      });
    }

    lineIndex++;
  }

  return {
    type: "REMESSA",
    layout: String(layout),
    entries,
  };
}

// --- Record Parsing ---

/**
 * Faz o parsing de uma linha de header CNAB 444 BMP para um objeto BMPCnab444Header.
 *
 * @param line - A string da linha de header (deve ter 444 caracteres).
 * @param index - O índice da linha no arquivo (base zero).
 * @returns O objeto BMPCnab444Header parseado.
 * @throws {InvalidRecordFormatError} Se a linha não corresponder ao formato esperado de header.
 */
export function parseHeader(line: string, index: number): BMPCnab444Header {
  if (
    line[0] !== "0" ||
    line[1] !== "1" ||
    line.substring(2, 9) !== "REMESSA"
  ) {
    throw new InvalidRecordFormatError({
      prefix,
      lineNumber: index + 1,
      lineContent: line,
    });
  }
  return {
    recordType: "0",
    remessaId: "1",
    remessaLiteral: "REMESSA",
    serviceCode: line.substring(9, 11) as "01",
    serviceLiteral: line.substring(11, 26).trim() as "COBRANCA",
    originatorCode: line.substring(26, 46),
    originatorName: line.substring(46, 76),
    bankCode: line.substring(76, 79) as "611",
    bankName: line.substring(79, 94).trim() as "PAULISTA S.A.",
    fileDate: line.substring(94, 100),
    blanks1: line.substring(100, 108),
    systemId: line.substring(108, 110) as "MX",
    fileSequence: line.substring(110, 117),
    blanks2: line.substring(117, 438),
    recordSequence: line.substring(438, 444),
  };
}

/**
 * Faz o parsing de uma linha de detalhe CNAB 444 BMP para um objeto BMPCnab444Detail.
 *
 * @param line - A string da linha de detalhe (deve ter 444 caracteres).
 * @param index - O índice da linha no arquivo (base zero).
 * @returns O objeto BMPCnab444Detail parseado.
 * @throws {InvalidRecordFormatError} Se a linha não corresponder ao formato esperado de detalhe.
 */
export function parseDetail(line: string, index: number): BMPCnab444Detail {
  if (line[0] !== "1") {
    throw new InvalidRecordFormatError({
      prefix,
      lineNumber: index + 1,
      lineContent: line,
      startCol: 0,
      endCol: 1,
    });
  }
  return {
    recordType: "1",
    autoDebit: line.substring(1, 20),
    coobligation: line.substring(20, 22),
    specialCharacteristic: line.substring(22, 24),
    operationModality: line.substring(24, 28),
    operationNature: line.substring(28, 30),
    fundsOrigin: line.substring(30, 34),
    riskClass: line.substring(34, 36),
    zeros1: line.substring(36, 37),
    participantControlNumber: line.substring(37, 62),
    chequeBankNumber: line.substring(62, 65),
    zeros2: line.substring(65, 70),
    bankTitleId: line.substring(70, 81),
    ourNumberDigit: line.substring(81, 82),
    paidAmount: line.substring(82, 92),
    paymentSlipCondition: line.substring(92, 93),
    paymentSlipDebit: line.substring(93, 94),
    liquidationDate: line.substring(94, 100),
    bankOperationId: line.substring(100, 104),
    creditSplitIndicator: line.substring(104, 105),
    debitNoticeAddressing: line.substring(105, 106),
    blanks1: line.substring(106, 108),
    occurrenceId: line.substring(108, 110),
    documentNumber: line.substring(110, 120),
    dueDate: line.substring(120, 126),
    faceValue: line.substring(126, 139),
    chargingBankCode: line.substring(139, 142),
    depositaryAgency: line.substring(142, 147),
    titleSpecies: line.substring(147, 149),
    identification: line.substring(149, 150),
    issueDate: line.substring(150, 156),
    instruction1: line.substring(156, 158),
    instruction2: line.substring(158, 159),
    assignorPersonType: line.substring(159, 161),
    zeros3: line.substring(161, 173),
    assignmentTermNumber: line.substring(173, 192),
    presentValue: line.substring(192, 205),
    discountValue: line.substring(205, 218),
    payerIdType: line.substring(218, 220),
    payerId: line.substring(220, 234),
    payerName: line.substring(234, 274),
    payerAddress: line.substring(274, 314),
    invoiceNumber: line.substring(314, 323),
    invoiceSeries: line.substring(323, 326),
    payerZipCode: line.substring(326, 334),
    assignor: line.substring(334, 394),
    invoiceKey: line.substring(394, 438),
    recordSequence: line.substring(438, 444),
  };
}

/**
 * Analisa uma linha do trailer do arquivo CNAB 444 BMP.
 *
 * @param line - Linha do arquivo a ser analisada (deve ter 444 caracteres).
 * @param index - Índice da linha no arquivo (base 0).
 * @returns Objeto representando o trailer do CNAB 444 BMP.
 * @throws {InvalidRecordFormatError} Se a linha não começar com o tipo de registro "9".
 */
export function parseTrailer(line: string, index: number): BMPCnab444Trailer {
  if (line[0] !== "9") {
    throw new InvalidRecordFormatError({
      prefix,
      lineContent: line,
      lineNumber: index + 1,
      startCol: 0,
      endCol: 1,
    });
  }
  return {
    recordType: "9",
    blanks: line.substring(1, 438),
    recordSequence: line.substring(438, 444),
  };
}

/**
 * Gera o conteúdo de um arquivo CNAB 444 BMP a partir de uma lista de registros.
 *
 * @param entries - Array de registros do tipo BMPCnab444Record que compõem o arquivo.
 * @returns Uma string contendo o conteúdo formatado do arquivo CNAB 444 BMP.
 */
export function generate(entries: BMPCnab444Record[]): string {
  // Helper for numeric (zero-padded, right-aligned)
  const num = (val: string | number | undefined, len: number) =>
    String(val ?? "").padStart(len, "0");
  // Helper for alphanumeric (space-padded, left-aligned)
  const alpha = (val: string | undefined, len: number) =>
    (val ?? "").toUpperCase().padEnd(len, " ");

  let fileContent = "";

  for (const [index, entry] of entries.entries()) {
    if (entry.recordType === "0") {
      fileContent +=
        "0" +
        "1" +
        alpha("REMESSA", 7) +
        num("01", 2) +
        alpha("COBRANCA", 15) +
        num(entry.originatorCode ?? "", 20) +
        alpha(entry.originatorName ?? "", 30) +
        num("611", 3) +
        alpha("PAULISTA S.A.", 15) +
        num(entry.fileDate ?? "", 6) +
        alpha("", 8) +
        alpha("MX", 2) +
        num(entry.fileSequence ?? "", 7) +
        alpha("", 321) +
        num("000001", 6);
    }

    if (entry.recordType === "1") {
      fileContent +=
        "1" +
        alpha(entry.autoDebit, 19) +
        num(entry.coobligation, 2) +
        num(entry.specialCharacteristic, 2) +
        num(entry.operationModality, 4) +
        num(entry.operationNature, 2) +
        num(entry.fundsOrigin, 4) +
        alpha(entry.riskClass, 2) +
        num("0", 1) +
        alpha(entry.participantControlNumber, 25) +
        num(entry.chequeBankNumber, 3) +
        num("00000", 5) +
        alpha(entry.bankTitleId, 11) +
        alpha(entry.ourNumberDigit, 1) +
        num(entry.paidAmount, 10) +
        num("", 1) +
        alpha("", 1) +
        num(entry.liquidationDate, 6) +
        alpha("", 4) +
        alpha("", 1) +
        num("", 1) +
        alpha("", 2) +
        num(entry.occurrenceId, 2) +
        alpha(entry.documentNumber, 10) +
        num(entry.dueDate, 6) +
        num(entry.faceValue, 13) +
        num("", 3) +
        num("", 5) +
        num(entry.titleSpecies, 2) +
        alpha("", 1) +
        num(entry.issueDate, 6) +
        num("", 2) +
        num("", 1) +
        alpha(entry.assignorPersonType, 2) +
        num("", 12) +
        alpha(entry.assignmentTermNumber, 19) +
        num(entry.presentValue, 13) +
        num(entry.discountValue, 13) +
        alpha(entry.payerIdType, 2) +
        num(entry.payerId, 14) +
        alpha(entry.payerName, 40) +
        alpha(entry.payerAddress, 40) +
        alpha(entry.invoiceNumber, 9) +
        alpha(entry.invoiceSeries, 3) +
        num(entry.payerZipCode, 8) +
        alpha(entry.assignor, 60) +
        alpha(entry.invoiceKey, 44) +
        num(index + 1, 6);
    }

    if (entry.recordType === "9") {
      fileContent += "9" + alpha("", 437) + num(entry.recordSequence, 6);
    }

    fileContent += "\r\n";
  }

  return fileContent;
}

/**
 * Converte registros CNAB 444 BMP para o formato CNAB 400 Itaú (Remessa).
 *
 * Esta função mapeia os campos do layout BMP 444 para o layout Itaú 400,
 * aplicando as transformações necessárias e preenchendo campos obrigatórios
 * que não existem no formato BMP.
 *
 * @param entries - Array de registros BMP CNAB 444 a serem convertidos.
 * @param fallback - Objeto opcional com valores padrão para campos obrigatórios do Itaú que não existem no BMP.
 * @returns Array de registros no formato CNAB 400 Itaú.
 * @throws {InvalidRecordTypeError} Se um registro possuir tipo desconhecido.
 */
export function convertToItau400Remessa(
  entries: BMPCnab444Record[],
  fallback?: {
    header?: Partial<ItauCnab400RemessaHeader>;
    detail1?: Partial<ItauCnab400RemessaDetail1>;
    trailer?: Partial<ItauCnab400RemessaTrailer>;
  },
): ItauCnab400RemessaRecord[] {
  // Ordena para garantir header, detalhes e trailer na ordem correta
  entries.sort((a, b) => +a.recordType - +b.recordType);

  const now = new Date();

  // Função auxiliar para formatar datas para DDMMAA
  const formatDate = (date: string | Date) => {
    if (!date) return "";
    let d: Date;
    if (typeof date === "string") {
      // Aceita formatos DDMMAAAA, DDMMAA, AAAAMMDD
      if (/^\d{8}$/.test(date)) {
        // DDMMAAAA
        d = new Date(
          +date.slice(4, 8),
          +date.slice(2, 4) - 1,
          +date.slice(0, 2),
        );
      } else if (/^\d{6}$/.test(date)) {
        // DDMMAA
        d = new Date(
          2000 + +date.slice(4, 6),
          +date.slice(2, 4) - 1,
          +date.slice(0, 2),
        );
      } else {
        d = new Date(date);
      }
    } else {
      d = date;
    }
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yy = String(d.getFullYear()).slice(-2);
    return `${dd}${mm}${yy}`;
  };

  // Função auxiliar para formatar valores para 13 dígitos (11 inteiros + 2 decimais)
  const formatValue = (value: string | number) => {
    if (!value) return "".padStart(13, "0");
    const num =
      typeof value === "string"
        ? parseFloat(value.replace(/[^\d]/g, ""))
        : value;
    return Math.round(Number(num)).toString().padStart(13, "0");
  };

  // Função auxiliar para formatar strings alfanuméricas
  const formatString = (str: string, length: number) => {
    if (!str) return "".padEnd(length, " ");
    // Remove acentos, caixa alta, sem caracteres especiais
    return str
      .normalize("NFD")
      .replace(/[^\w\s\-.]/g, "")
      .toUpperCase()
      .padEnd(length, " ")
      .slice(0, length);
  };

  /**
   * Mapeamento de espécie de título BMP 444 (campo 29) para espécie de título Itaú 400 (Tabela 10)
   * Fonte BMP: @parse-cnab-444-bmp.mdc 4.2
   * Fonte Itaú: @parse-cnab-400-itau.mdc Tabela 10
   */
  const titleSpecies: Record<string, string> = {
    // BMP: '01' Duplicata        -> Itaú: '01' Duplicata Mercantil
    "01": "01",
    // BMP: '02' Nota Promissória -> Itaú: '02' Nota Promissória
    "02": "02",
    // BMP: '06' Nota Promissória Física -> Itaú: '12' Nota Promissória Rural
    "06": "12",
    // BMP: '07' Cartolas Bancárias -> Itaú: '05' Recibo
    "07": "05",
    // BMP: '14' Duplicata de Serviço Física -> Itaú: '04' Duplicata de Serviço
    "14": "04",
    // BMP: '51' Cheque -> Itaú: '03' Cheque
    "51": "03",
    // BMP: '60' Contrato -> Itaú: '20' Contrato
    "60": "20",
    // BMP: '61' Contrato Físico -> Itaú: '20' Contrato
    "61": "20",
    // BMP: '62' Confissões de Dívida -> Itaú: '99' Outros
    "62": "99",
    // BMP: '64' Assunção de Dívida -> Itaú: '99' Outros
    "64": "15",
    // BMP: '67' Operações Cartão de Crédito Digital -> Itaú: '99' Outros
    "67": "99",
    // BMP: '70' CCB Pré Digital -> Itaú: '99' Outros
    "70": "99",
    // BMP: '71' CCB Pré Balcão -> Itaú: '99' Outros
    "71": "99",
    // BMP: '72' CCB Pré Cetip -> Itaú: '99' Outros
    "72": "99",
  };

  // Mapeamento dos registros
  return entries.map((bmpEntry, index) => {
    if (bmpEntry.recordType === "0") {
      // HEADER
      const agency = fallback?.header?.agency || "";
      const account = fallback?.header?.account || "";

      const header: ItauCnab400RemessaHeader = {
        recordType: "0",
        operation: "1",
        remessaLiteral: "REMESSA",
        serviceCode: "01",
        serviceLiteral: "COBRANCA",
        agency, // Não existe em BMP
        zeros1: "00",
        account, // Não existe em BMP
        dac: calculateDacAgenciaConta(agency, account), // Não existe em BMP
        blanks1: "".padEnd(8, " "),
        companyName: formatString(bmpEntry.originatorName || "", 30),
        bankCode: bmpEntry.bankCode || "341",
        bankName: "BANCO ITAU SA",
        generationDate: bmpEntry.fileDate
          ? formatDate(bmpEntry.fileDate)
          : formatDate(now),
        blanks2: "".padEnd(294, " "),
        sequentialNumber: String(index + 1).padStart(6, "0"),
      };
      return header;
    } else if (bmpEntry.recordType === "1") {
      const agency = fallback?.detail1?.agency || "";
      const account = fallback?.detail1?.account || "";

      const [
        address = "",
        number = "",
        neighborhood = "",
        city = "",
        state = "",
      ] = bmpEntry.payerAddress.split(",").map((s) => s.trim());

      // DETALHE
      const detail: ItauCnab400RemessaDetail1 = {
        recordType: "1",
        beneficiaryTaxIdType: fallback?.detail1?.beneficiaryTaxIdType || "", // Não existe em BMP
        beneficiaryTaxId: fallback?.detail1?.beneficiaryTaxId || "", // Não existe em BMP
        agency, // Não existe em BMP
        zeros1: "00",
        account, // Não existe em BMP
        dac: calculateDacAgenciaConta(agency, account), // Não existe em BMP
        blanks1: "",
        instruction: "",
        yourNumber: bmpEntry.participantControlNumber || "",
        ourNumber: fallback?.detail1?.ourNumber || "", // Não existe em BMP
        currencyQuantity: "",
        walletNumber: fallback?.detail1?.walletNumber || "", // Não existe em BMP
        bankUse: "",
        walletCode: fallback?.detail1?.walletCode || "", // Não existe em BMP
        occurrenceCode: bmpEntry.occurrenceId || "",
        documentNumber: bmpEntry.documentNumber || "",
        dueDate: bmpEntry.dueDate ? formatDate(bmpEntry.dueDate) : "",
        amount: bmpEntry.faceValue ? formatValue(bmpEntry.faceValue) : "",
        bankCode: bmpEntry.chargingBankCode || "341",
        chargingAgency: bmpEntry.depositaryAgency || "",
        species: titleSpecies[bmpEntry.titleSpecies] || "",
        acceptance: "A", // Não existe em BMP
        issueDate: bmpEntry.issueDate ? formatDate(bmpEntry.issueDate) : "",
        instruction1: fallback?.detail1?.instruction1 || "",
        instruction2: fallback?.detail1?.instruction2 || "",
        dailyInterest: fallback?.detail1?.dailyInterest || "", // Não existe em BMP
        discountDate: fallback?.detail1?.discountDate || "", // Não existe em BMP
        discountAmount: fallback?.detail1?.discountAmount || "", // Não existe em BMP
        iofAmount: fallback?.detail1?.iofAmount || "", // Não existe em BMP
        rebateAmount: bmpEntry.discountValue
          ? formatValue(bmpEntry.discountValue)
          : "",
        payerTaxIdType: bmpEntry.payerIdType || "",
        payerTaxId: bmpEntry.payerId || "",
        payerName: formatString(bmpEntry.payerName || "", 30),
        blanks2: "",
        payerAddress:
          [address, number].join(" ").trim() ||
          fallback?.detail1?.payerAddress ||
          "",
        payerNeighborhood:
          neighborhood || fallback?.detail1?.payerNeighborhood || "", // Não existe em BMP
        payerZipCode: bmpEntry.payerZipCode || "",
        payerCity: city || fallback?.detail1?.payerCity || "", // Não existe em BMP
        payerState: state || fallback?.detail1?.payerState || "", // Não existe em BMP
        drawerGuarantor: fallback?.detail1?.drawerGuarantor || "", // Não existe em BMP
        blanks3: "",
        interestStartDate: fallback?.detail1?.interestStartDate || "", // Não existe em BMP
        protestDays: fallback?.detail1?.protestDays || "", // Não existe em BMP
        blanks4: "",
        sequentialNumber: String(index + 1),
      };
      return detail;
    } else if (bmpEntry.recordType === "9") {
      // TRAILER
      const trailer: ItauCnab400RemessaTrailer = {
        recordType: "9",
        blanks1: "",
        sequentialNumber: String(index + 1),
      };
      return trailer;
    } else {
      throw new InvalidRecordTypeError({
        prefix,
      });
    }
  });
}
