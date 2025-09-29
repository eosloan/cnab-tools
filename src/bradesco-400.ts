// CNAB 400 Bradesco Types - Strictly per parse-cnab-400-bradesco.mdc

import {
  InvalidRecordTypeError,
  LineLengthError,
  UnsupportedLayoutError,
} from "./utils/errors";
import { Cnab } from "./utils/types";

export type BradescoCnab400RemessaHeader = {
  recordType: "0";
  operation: string;
  remessaLiteral: "REMESSA";
  serviceCode: string;
  serviceLiteral: "COBRANCA";
  agency: string; // Agência Mantenedora da Conta (4 posições)
  zeros1: "00";
  account: string; // Número da Conta Corrente (5 posições)
  dac: string; // DV da Conta Corrente (1 posição)
  blanks1: string; // Brancos (8 posições)
  companyName: string; // Nome da Empresa (30 posições)
  bankCode: string;
  bankName: "BANCO BRADESCO SA";
  generationDate: string; // Data de Geração do Arquivo (6 posições - DDMMAA)
  blanks2: string; // Brancos (294 posições)
  sequentialNumber: string; // Número Sequencial do Registro (6 posições)
};

export type BradescoCnab400RemessaDetail1 = {
  recordType: "1";
  beneficiaryTaxIdType: string; // Tipo de Inscrição do Beneficiário (2 posições)
  beneficiaryTaxId: string; // CNPJ/CPF do Beneficiário (14 posições)
  agency: string; // Agência Mantenedora da Conta (4 posições)
  zeros1: "00";
  account: string; // Número da Conta Corrente (5 posições)
  dac: string; // DV da Conta Corrente (1 posição)
  blanks1: string; // Brancos (4 posições)
  instruction: string; // Identificação da Instrução (4 posições)
  yourNumber: string; // Seu Número (25 posições)
  ourNumber: string; // Nosso Número (8 posições)
  currencyQuantity: string; // Quantidade de Moeda (13 posições - 8 inteiros + 5 decimais)
  walletNumber: string; // Número da Carteira (3 posições)
  bankUse: string; // Uso do Banco (21 posições)
  walletCode: string; // Código da Carteira (1 posição)
  occurrenceCode: string; // Código de Ocorrência (2 posições)
  documentNumber: string; // Número do Documento (10 posições)
  dueDate: string; // Data de Vencimento (6 posições - DDMMAA)
  amount: string; // Valor do Título (13 posições - 11 inteiros + 2 decimais)
  bankCode: string; // Código do Banco Cobrador (3 posições)
  chargingAgency: string; // Agência Cobradora (5 posições)
  species: string; // Espécie do Título (2 posições)
  acceptance: string; // Identificação de Título Aceito/Não Aceito (1 posição)
  issueDate: string; // Data de Emissão (6 posições - DDMMAA)
  instruction1: string; // 1ª Instrução (2 posições)
  instruction2: string; // 2ª Instrução (2 posições)
  dailyInterest: string; // Valor de Mora por Dia (13 posições - 11 inteiros + 2 decimais)
  discountDate: string; // Data Limite para Desconto (6 posições - DDMMAA)
  discountAmount: string; // Valor do Desconto (13 posições - 11 inteiros + 2 decimais)
  iofAmount: string; // Valor do IOF (13 posições - 11 inteiros + 2 decimais)
  rebateAmount: string; // Valor do Abatimento (13 posições - 11 inteiros + 2 decimais)
  payerTaxIdType: string; // Tipo de Inscrição do Pagador (2 posições)
  payerTaxId: string; // CNPJ/CPF do Pagador (14 posições)
  payerName: string; // Nome do Pagador (30 posições)
  blanks2: string; // Brancos (10 posições)
  payerAddress: string; // Endereço do Pagador (40 posições)
  payerNeighborhood: string; // Bairro do Pagador (12 posições)
  payerZipCode: string; // CEP do Pagador (8 posições)
  payerCity: string; // Cidade do Pagador (15 posições)
  payerState: string; // UF do Pagador (2 posições)
  drawerGuarantor: string; // Nome do Sacador/Avalista (30 posições)
  blanks3: string; // Brancos (4 posições)
  interestStartDate: string; // Data de Mora (6 posições - DDMMAA)
  protestDays: string; // Prazo para Protesto (2 posições)
  blanks4: string; // Branco (1 posição)
  sequentialNumber: string; // Número Sequencial do Registro (6 posições)
};

export type BradescoCnab400RemessaDetail2 = {
  recordType: "2";
  fineCode: string; // Código da Multa (1 posição)
  fineDate: string; // Data da Multa (8 posições - DDMMAAAA)
  fineAmount: string; // Valor da Multa (13 posições - 11 inteiros + 2 decimais)
  blanks1: string; // Brancos (371 posições)
  sequentialNumber: string; // Número Sequencial do Registro (6 posições)
};

export type BradescoCnab400RemessaDetail4 = {
  recordType: "4";
  valueType: string; // Tipo de Valor (1 posição)
  sequentialNumber: string; // Número Sequencial do Registro (6 posições)
};

export type BradescoCnab400RemessaDetail5 = {
  recordType: "5";
  payerEmail: string; // E-mail do Pagador para Envio do Boleto (120 posições)
  drawerTaxIdType: string; // Tipo de Inscrição do Sacador/Avalista (2 posições)
  drawerTaxId: string; // CNPJ/CPF do Sacador/Avalista (14 posições)
  drawerAddress: string; // Endereço do Sacador/Avalista (40 posições)
  blanks1: string; // Brancos (180 posições)
  sequentialNumber: string; // Número Sequencial do Registro (6 posições)
};

export type BradescoCnab400RemessaTrailer = {
  recordType: "9";
  blanks1: string; // Brancos (393 posições)
  sequentialNumber: string; // Número Sequencial do Registro (6 posições)
};

export type BradescoCnab400RetornoHeader = {
  recordType: "0";
  returnCode: string; // Código de Retorno (1 posição)
  returnLiteral: "RETORNO"; // Literal de Retorno (7 posições)
  sequentialNumber: string; // Número Sequencial do Registro (6 posições)
};

export type BradescoCnab400RetornoDetail1 = {
  recordType: "1"; // Identificação do Registro (1 posição)
  payerTaxIdType: string; // Tipo de Inscrição do Pagador (2 posições)
  payerTaxId: string; // CNPJ/CPF do Pagador (14 posições)
  agency: string; // Agência Mantenedora da Conta (4 posições)
  account: string; // Número da Conta Corrente (5 posições)
  dac: string; // DV da Conta Corrente (1 posição)
  yourNumber: string; // Seu Número (25 posições)
  ourNumber: string; // Nosso Número (8 posições)
  walletNumber: string; // Número da Carteira (3 posições)
  dacOurNumber: string; // DAC do Nosso Número (1 posição)
  occurrenceCode: string; // Código de Ocorrência (2 posições)
  occurrenceDate: string; // Data da Ocorrência (6 posições - DDMMAA)
  documentNumber: string; // Número do Documento (10 posições)
  dueDate: string; // Data de Vencimento (6 posições - DDMMAA)
  amount: string; // Valor do Título (13 posições - 11 inteiros + 2 decimais)
  bankCode: string; // Código do Banco (3 posições)
  chargingAgency: string; // Agência Cobradora (5 posições)
  chargingAgencyDac: string; // DAC da Agência Cobradora (1 posição)
  species: string; // Espécie do Título (2 posições)
  chargingCost: string; // Valor de Cobrança/Tarifa (13 posições - 11 inteiros + 2 decimais)
  iofAmount: string; // Valor do IOF (13 posições - 11 inteiros + 2 decimais)
  downPaymentAmount: string; // Valor do Abatimento (13 posições - 11 inteiros + 2 decimais)
  discountAmount: string; // Valor do Desconto (13 posições - 11 inteiros + 2 decimais)
  principalAmount: string; // Valor Principal (13 posições - 11 inteiros + 2 decimais)
  moraAmount: string; // Valor de Mora (13 posições - 11 inteiros + 2 decimais)
  otherCreditAmount: string; // Outros Créditos (13 posições - 11 inteiros + 2 decimais)
  bankslipDDA: string; // Boleto DDA (1 posição)
  creditDate: string; // Data do Crédito (6 posições - DDMMAA)
  cancelledInstructionCode: string; // Código da Instrução Cancelada (4 posições)
  payerName: string; // Nome do Pagador (30 posições)
  errorCodes: string; // Códigos de Erro (8 posições)
  liquidationCode: string; // Código de Liquidação (2 posições)
  sequentialNumber: string; // Número Sequencial do Registro (6 posições)
};

export type BradescoCnab400RetornoTrailer = {
  recordType: "9";
  returnCode: string; // Código de Retorno (1 posição)
  serviceCode: string; // Código do Serviço (2 posições)
  bankCode: string; // Código do Banco (3 posições)
  blanks1: string; // Brancos (10 posições)
  simpleCollectionCount: string; // Quantidade de Títulos de Cobrança Simples (8 posições)
  simpleCollectionValue: string; // Valor Total dos Títulos de Cobrança Simples (14 posições - 12 inteiros + 2 decimais)
  bankNotice: string; // Número do Aviso Bancário (8 posições)
  detailCount: string; // Quantidade de Registros de Detalhe (8 posições)
  detailTotalValue: string; // Valor Total dos Registros (14 posições - 12 inteiros + 2 decimais)
  sequentialNumber: string; // Número Sequencial do Registro (6 posições)
};

export type BradescoCnab400RemessaRecord =
  | BradescoCnab400RemessaHeader
  | BradescoCnab400RemessaDetail1
  | BradescoCnab400RemessaDetail2
  | BradescoCnab400RemessaDetail4
  | BradescoCnab400RemessaDetail5
  | BradescoCnab400RemessaTrailer;

export type BradescoCnab400RetornoRecord =
  | BradescoCnab400RetornoHeader
  | BradescoCnab400RetornoDetail1
  | BradescoCnab400RetornoTrailer;

export type BradescoCnab400Record =
  | BradescoCnab400RemessaRecord
  | BradescoCnab400RetornoRecord;

const prefix = "CNAB BRADESCO 400";

export function parseRemessa(
  lines: string[],
  layout: number,
): Cnab<BradescoCnab400RemessaRecord> {
  const entries: BradescoCnab400RemessaRecord[] = [];

  let lineIndex = 0;

  for (const line of lines) {
    if (line.length !== layout) {
      throw new LineLengthError({
        prefix,
        lineContent: line,
        lineNumber: lineIndex + 1,
      });
    }

    const recordType = line[0];

    switch (recordType) {
      case "0":
        entries.push(parseRemessaHeader(line));
        break;
      case "1":
        entries.push(parseRemessaDetail1(line));
        break;
      case "2":
        entries.push(parseRemessaDetail2(line));
        break;
      case "4":
        entries.push(parseRemessaDetail4(line));
        break;
      case "5":
        entries.push(parseRemessaDetail5(line));
        break;
      case "9":
        entries.push(parseRemessaTrailer(line));
        break;
      default:
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
    layout: "400",
    entries,
  };
}

export function parseRetorno(
  lines: string[],
  layout: number,
): Cnab<BradescoCnab400RetornoRecord> {
  const entries: BradescoCnab400RetornoRecord[] = [];

  let lineIndex = 0;

  for (const line of lines) {
    if (line.length !== layout) {
      throw new LineLengthError({
        prefix,
        lineContent: line,
        lineNumber: lineIndex + 1,
      });
    }

    const recordType = line[0];

    switch (recordType) {
      case "0":
        entries.push(parseRetornoHeader(line));
        break;
      case "1":
        entries.push(parseRetornoDetail1(line));
        break;
      case "9":
        entries.push(parseRetornoTrailer(line));
        break;
      default:
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
    type: "RETORNO",
    layout: "400",
    entries,
  };
}

export function parse(input: Buffer | string) {
  const content = Buffer.isBuffer(input) ? input.toString("utf8") : input;
  const lines = content.split(/\r?\n/).filter((line) => line.length > 0);

  if (lines.length === 0) {
    throw new UnsupportedLayoutError({ prefix });
  }

  const layout = lines[0].length;

  if (layout !== 400) {
    throw new UnsupportedLayoutError({ prefix });
  }

  // Determine file type based on header record type and operation code
  const recordType = lines[0][0];
  if (recordType !== "0") {
    throw new InvalidRecordTypeError({
      prefix,
      lineContent: lines[0],
      lineNumber: 1,
      startCol: 0,
      endCol: 1,
    });
  }

  const operationCode = lines[0][1];
  if (operationCode === "1") {
    return parseRemessa(lines, layout);
  } else if (operationCode === "2") {
    return parseRetorno(lines, layout);
  } else {
    throw new InvalidRecordTypeError({
      prefix,
      lineContent: lines[0],
      lineNumber: 1,
      startCol: 1,
      endCol: 2,
    });
  }
}

/**
 * Faz o parsing do header de remessa do arquivo CNAB 400 do Bradesco.
 *
 * @param line - Linha do arquivo contendo o header de remessa (400 caracteres)
 * @returns Objeto representando o header de remessa conforme o layout do Bradesco
 */
export function parseRemessaHeader(line: string): BradescoCnab400RemessaHeader {
  return {
    recordType: "0",
    operation: line[1],
    remessaLiteral: line.substring(2, 9).trim() as "REMESSA",
    serviceCode: line.substring(9, 11) as "01",
    serviceLiteral: line.substring(11, 26).trim() as "COBRANCA",
    agency: line.substring(26, 30),
    zeros1: line.substring(30, 32) as "00",
    account: line.substring(32, 37),
    dac: line[37],
    blanks1: line.substring(38, 46),
    companyName: line.substring(46, 76).trim(),
    bankCode: line.substring(76, 79) as "237",
    bankName: line.substring(79, 94).trim() as "BANCO BRADESCO SA",
    generationDate: line.substring(94, 100),
    blanks2: line.substring(100, 394),
    sequentialNumber: line.substring(394, 400),
  };
}

export function parseRemessaDetail1(
  line: string,
): BradescoCnab400RemessaDetail1 {
  return {
    recordType: "1",
    beneficiaryTaxIdType: line.substring(1, 3),
    beneficiaryTaxId: line.substring(3, 17),
    agency: line.substring(17, 21),
    zeros1: line.substring(21, 23) as "00",
    account: line.substring(23, 28),
    dac: line[28],
    blanks1: line.substring(29, 33),
    instruction: line.substring(33, 37),
    yourNumber: line.substring(37, 62),
    ourNumber: line.substring(62, 70),
    currencyQuantity: line.substring(70, 83),
    walletNumber: line.substring(83, 86),
    bankUse: line.substring(86, 107),
    walletCode: line[107],
    occurrenceCode: line.substring(108, 110),
    documentNumber: line.substring(110, 120),
    dueDate: line.substring(120, 126),
    amount: line.substring(126, 139),
    bankCode: line.substring(139, 142) as "237",
    chargingAgency: line.substring(142, 147),
    species: line.substring(147, 149),
    acceptance: line[149],
    issueDate: line.substring(150, 156),
    instruction1: line.substring(156, 158),
    instruction2: line.substring(158, 160),
    dailyInterest: line.substring(160, 173),
    discountDate: line.substring(173, 179),
    discountAmount: line.substring(179, 192),
    iofAmount: line.substring(192, 205),
    rebateAmount: line.substring(205, 218),
    payerTaxIdType: line.substring(218, 220),
    payerTaxId: line.substring(220, 234),
    payerName: line.substring(234, 264),
    blanks2: line.substring(264, 274),
    payerAddress: line.substring(274, 314),
    payerNeighborhood: line.substring(314, 326),
    payerZipCode: line.substring(326, 334),
    payerCity: line.substring(334, 349),
    payerState: line.substring(349, 351),
    drawerGuarantor: line.substring(351, 381),
    blanks3: line.substring(381, 385),
    interestStartDate: line.substring(385, 391),
    protestDays: line.substring(391, 393),
    blanks4: line[393],
    sequentialNumber: line.substring(394, 400),
  };
}

export function parseRemessaDetail2(
  line: string,
): BradescoCnab400RemessaDetail2 {
  return {
    recordType: "2",
    fineCode: line[1],
    fineDate: line.substring(2, 10),
    fineAmount: line.substring(10, 23),
    blanks1: line.substring(23, 394),
    sequentialNumber: line.substring(394, 400),
  };
}

export function parseRemessaDetail4(
  line: string,
): BradescoCnab400RemessaDetail4 {
  return {
    recordType: "4",
    valueType: line[393],
    sequentialNumber: line.substring(394, 400),
  };
}

export function parseRemessaDetail5(
  line: string,
): BradescoCnab400RemessaDetail5 {
  return {
    recordType: "5",
    payerEmail: line.substring(1, 121),
    drawerTaxIdType: line.substring(121, 123),
    drawerTaxId: line.substring(123, 137),
    drawerAddress: line.substring(137, 177),
    blanks1: line.substring(215, 395),
    sequentialNumber: line.substring(394, 400),
  };
}

export function parseRemessaTrailer(
  line: string,
): BradescoCnab400RemessaTrailer {
  return {
    recordType: "9",
    blanks1: line.substring(1, 394),
    sequentialNumber: line.substring(394, 400),
  };
}

export function parseRetornoHeader(line: string): BradescoCnab400RetornoHeader {
  return {
    recordType: "0",
    returnCode: line[1],
    returnLiteral: line.substring(2, 9) as "RETORNO",
    sequentialNumber: line.substring(394, 400),
  };
}

export function parseRetornoDetail1(
  line: string,
): BradescoCnab400RetornoDetail1 {
  return {
    recordType: "1",
    payerTaxIdType: line.substring(1, 3),
    payerTaxId: line.substring(3, 17),
    agency: line.substring(17, 21),
    account: line.substring(23, 28),
    dac: line[28],
    yourNumber: line.substring(37, 62),
    ourNumber: line.substring(62, 70),
    walletNumber: line.substring(82, 85),
    dacOurNumber: line[93],
    occurrenceCode: line.substring(108, 110),
    occurrenceDate: line.substring(110, 116),
    documentNumber: line.substring(116, 126),
    dueDate: line.substring(146, 152),
    amount: line.substring(152, 165),
    bankCode: line.substring(165, 168) as "237",
    chargingAgency: line.substring(168, 172),
    chargingAgencyDac: line[172],
    species: line.substring(173, 175),
    chargingCost: line.substring(175, 188),
    iofAmount: line.substring(214, 227),
    downPaymentAmount: line.substring(227, 240),
    discountAmount: line.substring(240, 253),
    principalAmount: line.substring(253, 266),
    moraAmount: line.substring(266, 279),
    otherCreditAmount: line.substring(279, 292),
    bankslipDDA: line.substring(292, 293),
    creditDate: line.substring(295, 301),
    cancelledInstructionCode: line.substring(301, 305),
    payerName: line.substring(324, 354),
    errorCodes: line.substring(377, 385),
    liquidationCode: line.substring(392, 394),
    sequentialNumber: line.substring(394, 400),
  };
}

export function parseRetornoTrailer(
  line: string,
): BradescoCnab400RetornoTrailer {
  return {
    recordType: "9",
    returnCode: line[1],
    serviceCode: line.substring(2, 4),
    bankCode: line.substring(4, 7),
    blanks1: line.substring(7, 17),
    simpleCollectionCount: line.substring(17, 25),
    simpleCollectionValue: line.substring(25, 39),
    bankNotice: line.substring(39, 47),
    detailCount: line.substring(213, 221),
    detailTotalValue: line.substring(221, 235),
    sequentialNumber: line.substring(394, 400),
  };
}

export function generate(entries: BradescoCnab400Record[]): string {
  // Helper for numeric (zero-padded, right-aligned)
  const num = (val: string | number | undefined, len: number) =>
    String(val ?? "")
      .padStart(len, "0")
      .slice(0, len);
  // Helper for alphanumeric (space-padded, left-aligned)
  const alpha = (val: string | undefined, len: number) =>
    (val ?? "").padEnd(len, " ").slice(0, len);

  let fileContent = "";

  for (const entry of entries) {
    if (entry.recordType === "0") {
      // Header
      const e = entry as BradescoCnab400RemessaHeader;
      fileContent +=
        "0" +
        "1" +
        alpha("REMESSA", 7) +
        num("01", 2) +
        alpha("COBRANCA", 15) +
        num(e.agency, 4) +
        num("00", 2) +
        num(e.account, 5) +
        num(e.dac, 1) +
        alpha("", 8) +
        alpha(e.companyName, 30) +
        num("237", 3) +
        alpha("BANCO BRADESCO SA", 15) +
        num(e.generationDate, 6) +
        alpha("", 294) +
        num(e.sequentialNumber, 6);
    } else if (entry.recordType === "1") {
      // Detail 1
      const e = entry as BradescoCnab400RemessaDetail1;
      fileContent +=
        "1" +
        num(e.beneficiaryTaxIdType, 2) +
        num(e.beneficiaryTaxId, 14) +
        num(e.agency, 4) +
        num("00", 2) +
        num(e.account, 5) +
        num(e.dac, 1) +
        alpha("", 4) +
        num(e.instruction, 4) +
        alpha(e.yourNumber, 25) +
        num(e.ourNumber, 8) +
        num(e.currencyQuantity, 13) +
        num(e.walletNumber, 3) +
        alpha(e.bankUse, 21) +
        alpha(e.walletCode, 1) +
        num(e.occurrenceCode, 2) +
        alpha(e.documentNumber, 10) +
        num(e.dueDate, 6) +
        num(e.amount, 13) +
        num("237", 3) +
        num(e.chargingAgency, 5) +
        alpha(e.species, 2) +
        alpha(e.acceptance, 1) +
        num(e.issueDate, 6) +
        alpha(e.instruction1, 2) +
        alpha(e.instruction2, 2) +
        num(e.dailyInterest, 13) +
        num(e.discountDate, 6) +
        num(e.discountAmount, 13) +
        num(e.iofAmount, 13) +
        num(e.rebateAmount, 13) +
        num(e.payerTaxIdType, 2) +
        num(e.payerTaxId, 14) +
        alpha(e.payerName, 30) +
        alpha("", 10) +
        alpha(e.payerAddress, 40) +
        alpha(e.payerNeighborhood, 12) +
        num(e.payerZipCode, 8) +
        alpha(e.payerCity, 15) +
        alpha(e.payerState, 2) +
        alpha(e.drawerGuarantor, 30) +
        alpha("", 4) +
        num(e.interestStartDate, 6) +
        num(e.protestDays, 2) +
        alpha("", 1) +
        num(e.sequentialNumber, 6);
    } else if (entry.recordType === "2") {
      // Detail 2
      const e = entry;
      fileContent +=
        "2" +
        alpha(e.fineCode, 1) +
        num(e.fineDate, 8) +
        num(e.fineAmount, 13) +
        alpha("", 371) +
        num(e.sequentialNumber, 6);
    } else if (entry.recordType === "4") {
      // Detail 4 (rateio, partial)
      const e = entry;
      fileContent +=
        "4" +
        alpha("", 392) +
        alpha(e.valueType, 1) +
        num(e.sequentialNumber, 6);
    } else if (entry.recordType === "5") {
      // Detail 5 (email/sacador)
      const e = entry;
      fileContent +=
        "5" +
        alpha(e.payerEmail, 120) +
        num(e.drawerTaxIdType, 2) +
        num(e.drawerTaxId, 14) +
        alpha(e.drawerAddress, 40) +
        alpha("", 180) +
        num(e.sequentialNumber, 6);
    } else if (entry.recordType === "9") {
      // Trailer
      const e = entry as BradescoCnab400RemessaTrailer;
      fileContent += "9" + alpha("", 393) + num(e.sequentialNumber, 6);
    } else {
      throw new Error("Geração não suportada para registros de retorno");
    }
    fileContent += "\n";
  }
  return fileContent;
}

/**
 * Gera arquivo de remessa CNAB 400 Bradesco
 * @param data - Dados estruturados para geração da remessa
 * @returns Conteúdo do arquivo CNAB 400 formatado
 */
export function generateRemessa(data: {
  header: {
    agency: string;
    account: string;
    dac: string;
    companyName: string;
    generationDate: string; // DDMMAA
  };
  details: Array<{
    beneficiaryTaxIdType: string;
    beneficiaryTaxId: string;
    agency: string;
    account: string;
    dac: string;
    instruction?: string;
    yourNumber: string;
    ourNumber: string;
    currencyQuantity?: string;
    walletNumber: string;
    bankUse?: string;
    walletCode: string;
    occurrenceCode: string;
    documentNumber: string;
    dueDate: string; // DDMMAA
    amount: string;
    chargingAgency?: string;
    species?: string;
    acceptance?: string;
    issueDate?: string; // DDMMAA
    instruction1?: string;
    instruction2?: string;
    dailyInterest?: string;
    discountDate?: string; // DDMMAA or "000000"
    discountAmount?: string;
    iofAmount?: string;
    rebateAmount?: string;
    payerTaxIdType: string;
    payerTaxId: string;
    payerName: string;
    payerAddress: string;
    payerNeighborhood: string;
    payerZipCode: string;
    payerCity: string;
    payerState: string;
    drawerGuarantor?: string;
    interestStartDate?: string; // DDMMAA or "000000"
    protestDays?: string;
  }>;
  detail2Records?: Array<{
    fineCode: string;
    fineDate: string; // DDMMAAAA
    fineAmount: string;
  }>;
  detail4Records?: Array<{
    valueType: string;
  }>;
  detail5Records?: Array<{
    payerEmail: string;
    drawerTaxIdType: string;
    drawerTaxId: string;
    drawerAddress: string;
  }>;
}): string {
  // Helper functions
  const num = (val: string | number | undefined, len: number) =>
    String(val ?? "")
      .padStart(len, "0")
      .slice(0, len);
  const alpha = (val: string | undefined, len: number) =>
    (val ?? "").padEnd(len, " ").slice(0, len);

  let fileContent = "";
  let sequentialNumber = 1;

  // 1. Header de Remessa (Registro Tipo 0)
  fileContent +=
    "0" + // Pos 1: Identificação do Registro
    "1" + // Pos 2: Tipo de Operação (1=Remessa)
    alpha("REMESSA", 7) + // Pos 3-9: Identificação Literal de Remessa
    num("01", 2) + // Pos 10-11: Código do Serviço
    alpha("COBRANCA", 15) + // Pos 12-26: Identificação Literal do Serviço
    num(data.header.agency, 4) + // Pos 27-30: Agência Mantenedora da Conta
    num("00", 2) + // Pos 31-32: Zeros
    num(data.header.account, 5) + // Pos 33-37: Número da Conta Corrente
    num(data.header.dac, 1) + // Pos 38: DV da Conta Corrente
    alpha("", 8) + // Pos 39-46: Brancos
    alpha(data.header.companyName, 30) + // Pos 47-76: Nome da Empresa
    num("237", 3) + // Pos 77-79: Código do Banco (237=Bradesco)
    alpha("BANCO BRADESCO SA", 15) + // Pos 80-94: Nome do Banco
    num(data.header.generationDate, 6) + // Pos 95-100: Data de Geração do Arquivo
    alpha("", 294) + // Pos 101-394: Brancos
    num(String(sequentialNumber++), 6) + // Pos 395-400: Número Sequencial do Registro
    "\n";

  // 2. Detalhes Tipo 1 (Registro de Transação)
  for (const detail of data.details) {
    fileContent +=
      "1" + // Pos 1: Identificação do Registro
      num(detail.beneficiaryTaxIdType, 2) + // Pos 2-3: Tipo de Inscrição do Beneficiário
      num(detail.beneficiaryTaxId, 14) + // Pos 4-17: CNPJ/CPF do Beneficiário
      num(detail.agency, 4) + // Pos 18-21: Agência Mantenedora da Conta
      num("00", 2) + // Pos 22-23: Zeros
      num(detail.account, 5) + // Pos 24-28: Conta Corrente
      num(detail.dac, 1) + // Pos 29: DV da Conta Corrente
      alpha("", 4) + // Pos 30-33: Brancos
      num(detail.instruction || "0000", 4) + // Pos 34-37: Identificação da Instrução
      alpha(detail.yourNumber, 25) + // Pos 38-62: Seu Número
      num(detail.ourNumber, 8) + // Pos 63-70: Nosso Número
      num(detail.currencyQuantity || "0", 13) + // Pos 71-83: Quantidade de Moeda
      num(detail.walletNumber, 3) + // Pos 84-86: Número da Carteira
      alpha(detail.bankUse || "", 21) + // Pos 87-107: Uso do Banco
      alpha(detail.walletCode, 1) + // Pos 108: Carteira
      num(detail.occurrenceCode, 2) + // Pos 109-110: Código de Ocorrência
      alpha(detail.documentNumber, 10) + // Pos 111-120: Número do Documento
      num(detail.dueDate, 6) + // Pos 121-126: Data de Vencimento
      num(detail.amount, 13) + // Pos 127-139: Valor do Título
      num("237", 3) + // Pos 140-142: Código do Banco Cobrador
      num(detail.chargingAgency || "00000", 5) + // Pos 143-147: Agência Cobradora
      alpha(detail.species || "01", 2) + // Pos 148-149: Espécie do Título
      alpha(detail.acceptance || "N", 1) + // Pos 150: Identificação de Título Aceito/Não Aceito
      num(detail.issueDate || data.header.generationDate, 6) + // Pos 151-156: Data de Emissão
      alpha(detail.instruction1 || "00", 2) + // Pos 157-158: 1ª Instrução
      alpha(detail.instruction2 || "00", 2) + // Pos 159-160: 2ª Instrução
      num(detail.dailyInterest || "0", 13) + // Pos 161-173: Valor de Mora por Dia
      num(detail.discountDate || "000000", 6) + // Pos 174-179: Data Limite para Desconto
      num(detail.discountAmount || "0", 13) + // Pos 180-192: Valor do Desconto
      num(detail.iofAmount || "0", 13) + // Pos 193-205: Valor do IOF
      num(detail.rebateAmount || "0", 13) + // Pos 206-218: Valor do Abatimento
      num(detail.payerTaxIdType, 2) + // Pos 219-220: Tipo de Inscrição do Pagador
      num(detail.payerTaxId, 14) + // Pos 221-234: CNPJ/CPF do Pagador
      alpha(detail.payerName, 30) + // Pos 235-264: Nome do Pagador
      alpha("", 10) + // Pos 265-274: Brancos
      alpha(detail.payerAddress, 40) + // Pos 275-314: Endereço do Pagador
      alpha(detail.payerNeighborhood, 12) + // Pos 315-326: Bairro do Pagador
      num(detail.payerZipCode, 8) + // Pos 327-334: CEP do Pagador
      alpha(detail.payerCity, 15) + // Pos 335-349: Cidade do Pagador
      alpha(detail.payerState, 2) + // Pos 350-351: UF do Pagador
      alpha(detail.drawerGuarantor || "", 30) + // Pos 352-381: Nome do Sacador/Avalista
      alpha("", 4) + // Pos 382-385: Brancos
      num(detail.interestStartDate || "000000", 6) + // Pos 386-391: Data de Mora
      num(detail.protestDays || "00", 2) + // Pos 392-393: Prazo para Protesto
      alpha("", 1) + // Pos 394: Branco
      num(String(sequentialNumber++), 6) + // Pos 395-400: Número Sequencial
      "\n";
  }

  // 3. Detalhes Tipo 2 (Multa)
  if (data.detail2Records) {
    for (const detail2 of data.detail2Records) {
      fileContent +=
        "2" + // Pos 1: Identificação do Registro
        alpha(detail2.fineCode, 1) + // Pos 2: Código da Multa
        num(detail2.fineDate, 8) + // Pos 3-10: Data da Multa
        num(detail2.fineAmount, 13) + // Pos 11-23: Valor da Multa
        alpha("", 371) + // Pos 24-394: Brancos
        num(String(sequentialNumber++), 6) + // Pos 395-400: Número Sequencial
        "\n";
    }
  }

  // 4. Detalhes Tipo 4 (Rateio de Crédito)
  if (data.detail4Records) {
    for (const detail4 of data.detail4Records) {
      fileContent +=
        "4" + // Pos 1: Identificação do Registro
        alpha("", 392) + // Pos 2-393: Brancos (campos específicos do rateio conforme necessário)
        alpha(detail4.valueType, 1) + // Pos 394: Tipo de Valor
        num(String(sequentialNumber++), 6) + // Pos 395-400: Número Sequencial
        "\n";
    }
  }

  // 5. Detalhes Tipo 5 (E-mail e Endereço do Sacador/Avalista)
  if (data.detail5Records) {
    for (const detail5 of data.detail5Records) {
      fileContent +=
        "5" + // Pos 1: Identificação do Registro
        alpha(detail5.payerEmail, 120) + // Pos 2-121: E-mail do Pagador para Envio do Boleto
        num(detail5.drawerTaxIdType, 2) + // Pos 122-123: Tipo de Inscrição do Sacador/Avalista
        num(detail5.drawerTaxId, 14) + // Pos 124-137: CNPJ/CPF do Sacador/Avalista
        alpha(detail5.drawerAddress, 40) + // Pos 138-177: Endereço do Sacador/Avalista
        alpha("", 180) + // Pos 178-394: Brancos (outros campos de endereço conforme necessário)
        num(String(sequentialNumber++), 6) + // Pos 395-400: Número Sequencial
        "\n";
    }
  }

  // 6. Trailer (Registro Tipo 9)
  fileContent +=
    "9" + // Pos 1: Identificação do Registro
    alpha("", 393) + // Pos 2-394: Brancos
    num(String(sequentialNumber), 6) + // Pos 395-400: Número Sequencial do Registro
    "\n";

  return fileContent;
}

/**
 * Calcula o DAC do Código de Barras (Módulo 11)
 * Anexo 2: Cálculo do DAC do Código de Barras (Módulo 11)
 * @param codigoBarras43Digitos - Os 43 dígitos do código de barras (sem a 5ª posição)
 * @returns O DAC calculado
 */
export function calculateDacCodigoBarras(
  codigoBarras43Digitos: string,
): string {
  if (codigoBarras43Digitos.length !== 43) {
    throw new Error("Código de barras deve ter exatamente 43 dígitos");
  }

  // Sequência de multiplicadores: 2, 3, 4, 5, 6, 7, 8, 9, 2, 3, ...
  const multiplicadores = [2, 3, 4, 5, 6, 7, 8, 9];
  let soma = 0;

  // Multiplicar da direita para a esquerda
  for (let i = 42; i >= 0; i--) {
    const digito = parseInt(codigoBarras43Digitos[i]);
    const multiplicador = multiplicadores[(42 - i) % 8];
    soma += digito * multiplicador;
  }

  const resto = soma % 11;
  let dac = 11 - resto;

  // Exceções: Se o resultado for 0, 1, 10 ou 11, o DAC será 1
  if (dac === 0 || dac === 1 || dac === 10 || dac === 11) {
    dac = 1;
  }

  return dac.toString();
}

/**
 * Calcula o DAC da Representação Numérica (Módulo 10)
 * Anexo 3: Cálculo do DAC da Representação Numérica (Módulo 10)
 * @param campo - O campo para calcular o DAC (ex: Campo 1, 2 ou 3 da Linha Digitável)
 * @returns O DAC calculado
 */
export function calculateDacRepresentacaoNumerica(campo: string): string {
  // Sequência de multiplicadores: 2, 1, 2, 1, ...
  const multiplicadores = [2, 1];
  let soma = 0;

  // Multiplicar da direita para a esquerda
  for (let i = campo.length - 1; i >= 0; i--) {
    const digito = parseInt(campo[i]);
    const multiplicador = multiplicadores[(campo.length - 1 - i) % 2];
    let resultado = digito * multiplicador;

    // Se o resultado for maior que 9, somar os algarismos
    if (resultado > 9) {
      resultado = Math.floor(resultado / 10) + (resultado % 10);
    }

    soma += resultado;
  }

  const resto = soma % 10;
  let dac = 10 - resto;

  // Exceção: Se o resultado for 10, o DAC será 0
  if (dac === 10) {
    dac = 0;
  }

  return dac.toString();
}

/**
 * Calcula o DAC do "Nosso Número"
 * Anexo 4: Cálculo do DAC do "Nosso Número"
 * @param agencia - Código da agência (4 dígitos)
 * @param conta - Código da conta (5 dígitos)
 * @param carteira - Código da carteira (3 dígitos)
 * @param nossoNumero - Nosso número (8 dígitos)
 * @returns O DAC calculado
 */
export function calculateDacNossoNumero(
  agencia: string,
  conta: string,
  carteira: string,
  nossoNumero: string,
): string {
  // Carteiras especiais que usam apenas Carteira + Nosso Número
  const carteirasEspeciais = ["126", "131", "146", "150", "168"];

  let baseCalculo: string;

  if (carteirasEspeciais.includes(carteira)) {
    // Exceção: A base é apenas Carteira + Nosso Número
    baseCalculo = carteira + nossoNumero;
  } else {
    // Regra geral: Agência + Conta + Carteira + Nosso Número
    baseCalculo = agencia + conta + carteira + nossoNumero;
  }

  return calculateDacRepresentacaoNumerica(baseCalculo);
}

/**
 * Calcula o DAC da Agência/Conta
 * @param agencia - Código da agência (4 dígitos)
 * @param conta - Código da conta (5 dígitos)
 * @returns O DAC calculado
 */
export function calculateDacAgenciaConta(
  agencia: string,
  conta: string,
): string {
  const baseCalculo = agencia + conta;
  return calculateDacRepresentacaoNumerica(baseCalculo);
}

/**
 * Calcula o DAC do Campo Livre do Código de Barras
 * @param carteira - Código da carteira (3 dígitos)
 * @param nossoNumero - Nosso número (8 dígitos)
 * @param agencia - Código da agência (4 dígitos)
 * @param conta - Código da conta (5 dígitos)
 * @returns O DAC calculado
 */
export function calculateDacCampoLivre(
  carteira: string,
  nossoNumero: string,
  agencia: string,
  conta: string,
): string {
  // Campo Livre: Carteira + Nosso Número + DAC + Agência + Conta + DAC + Zeros
  const baseCalculo = carteira + nossoNumero + agencia + conta;
  return calculateDacRepresentacaoNumerica(baseCalculo);
}

/**
 * Calcula o fator de vencimento para boletos bancários, conforme padrão Febraban.
 * O fator de vencimento é o número de dias decorridos desde a data base (03/07/2000),
 * módulo 9000, somado a 1000, e preenchido à esquerda com zeros para 4 dígitos.
 *
 * @param dueDate - Data de vencimento como objeto Date (UTC).
 * @returns O fator de vencimento com 4 dígitos, como string.
 *
 * Exemplo:
 *   calculateDueFactor(new Date("2000-07-03")) // "1000"
 *   calculateDueFactor(new Date("2025-02-21")) // "9999"
 */
export function calculateDueFactor(dueDate: Date): string {
  const base = Date.UTC(2000, 6, 3);
  const actualDate = Date.UTC(
    dueDate.getUTCFullYear(),
    dueDate.getUTCMonth(),
    dueDate.getUTCDate(),
  );
  const daysDiff = Math.floor((actualDate - base) / (1000 * 60 * 60 * 24));
  const cycle = ((daysDiff % 9000) + 9000) % 9000;
  const factor = 1000 + cycle;
  const dueFactor = factor.toString().padStart(4, "0");

  return dueFactor;
}

/**
 * Gera o código de barras completo (44 posições)
 * @param carteira - Código da carteira (3 dígitos)
 * @param nossoNumero - Nosso número (8 dígitos)
 * @param agencia - Código da agência (4 dígitos)
 * @param conta - Código da conta (5 dígitos)
 * @param valor - Valor do título (sem vírgula, ex: 12345 para R$ 123,45)
 * @param vencimento - Data de vencimento
 * @returns O código de barras completo de 44 posições
 */
export function generateCodigoBarras(
  carteira: string,
  nossoNumero: string,
  agencia: string,
  conta: string,
  valor: string,
  vencimento: Date,
): string {
  // 1-3: Código do Banco (237)
  const codigoBanco = "237";

  // 4-4: Código da Moeda (9 para Real)
  const codigoMoeda = "9";

  // 6-9: Fator de Vencimento
  const fatorVenc = calculateDueFactor(vencimento);

  // 10-19: Valor do Título (com 2 casas decimais)
  const valorFormatado = valor.padStart(10, "0").slice(-10);

  // 20-44: Campo Livre
  const dacNossoNumero = calculateDacNossoNumero(
    agencia,
    conta,
    carteira,
    nossoNumero.padStart(8, "0").slice(-8),
  );
  const dacAgenciaConta = calculateDacAgenciaConta(agencia, conta);

  const campoLivre =
    carteira.padStart(3, "0").slice(-3) +
    nossoNumero.padStart(8, "0").slice(-8) +
    dacNossoNumero +
    agencia.padStart(4, "0").slice(-4) +
    conta.padStart(5, "0").slice(-5) +
    dacAgenciaConta +
    "000"; // Zeros

  // Montar código de barras sem o DAC (43 posições)
  const codigoBarras43Digitos =
    codigoBanco + codigoMoeda + fatorVenc + valorFormatado + campoLivre;

  // Calcular DAC do código de barras
  const dacCodigoBarras = calculateDacCodigoBarras(codigoBarras43Digitos);

  // Substituir o placeholder pelo DAC calculado
  const codigoBarrasCompleto =
    codigoBanco +
    codigoMoeda +
    dacCodigoBarras +
    fatorVenc +
    valorFormatado +
    campoLivre;

  return codigoBarrasCompleto;
}

/**
 * Gera a linha digitável (IPTE - 47 posições)
 * @param codigoBarras - Código de barras completo (44 posições)
 * @returns A linha digitável formatada
 */
export function generateLinhaDigitavel(codigoBarras: string): string {
  if (codigoBarras.length !== 44) {
    throw new Error("Código de barras deve ter exatamente 44 posições");
  }

  const carteira = codigoBarras.substring(19, 22);
  const nossoNumero = codigoBarras.substring(22, 30);
  const agencia = codigoBarras.substring(31, 35);
  const conta = codigoBarras.substring(35, 40);

  const dacNossoNumero = calculateDacNossoNumero(
    agencia,
    conta,
    carteira,
    nossoNumero,
  );
  const dacConta = calculateDacRepresentacaoNumerica(conta);

  // Extrair campos do código de barras
  const campo1Base = `2379${carteira}${nossoNumero.slice(0, 2)}`;
  const campo2Base = `${nossoNumero.slice(2, 8)}${dacNossoNumero}${agencia.slice(0, 3)}`;
  const campo3Base = `${agencia.slice(3, 4)}${conta}${dacConta}000`;
  const campo4 = codigoBarras.substring(4, 5); // DAC do código de barras
  const campo5 = codigoBarras.substring(5, 9) + codigoBarras.substring(9, 19); // Fator + Valor

  // Calcular DACs dos campos
  const dacCampo1 = calculateDacRepresentacaoNumerica(campo1Base);
  const dacCampo2 = calculateDacRepresentacaoNumerica(campo2Base);
  const dacCampo3 = calculateDacRepresentacaoNumerica(campo3Base);

  // Montar campos com DACs
  const campo1 = campo1Base + dacCampo1;
  const campo2 = campo2Base + dacCampo2;
  const campo3 = campo3Base + dacCampo3;

  // Formatar linha digitável
  const linhaDigitavel =
    campo1.substring(0, 5) +
    "." +
    campo1.substring(5, 10) +
    " " +
    campo2.substring(0, 5) +
    "." +
    campo2.substring(5, 11) +
    " " +
    campo3.substring(0, 5) +
    "." +
    campo3.substring(5, 11) +
    " " +
    campo4 +
    " " +
    campo5;

  return linhaDigitavel;
}
