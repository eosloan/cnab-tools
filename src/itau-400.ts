// CNAB 400 Itau Types - Strictly per parse-cnab-400-itau.mdc

import {
  InvalidRecordTypeError,
  LineLengthError,
  UnsupportedLayoutError,
} from "./utils/errors";
import { Cnab } from "./utils/types";

export type ItauCnab400RemessaHeader = {
  recordType: "0";
  operation: string;
  remessaLiteral: "REMESSA";
  serviceCode: string;
  serviceLiteral: "COBRANCA";
  agency: string; // 4
  zeros1: "00";
  account: string; // 5
  dac: string; // 1
  blanks1: string; // 8
  companyName: string; // 30
  bankCode: string;
  bankName: "BANCO ITAU SA";
  generationDate: string; // 6 (DDMMAA)
  blanks2: string; // 294
  sequentialNumber: string; // 6
};

export type ItauCnab400RemessaDetail1 = {
  recordType: "1";
  beneficiaryTaxIdType: string; // 2
  beneficiaryTaxId: string; // 14
  agency: string; // 4
  zeros1: "00";
  account: string; // 5
  dac: string; // 1
  blanks1: string; // 4
  instruction: string; // 4
  yourNumber: string; // 25
  ourNumber: string; // 8
  currencyQuantity: string; // 13 (8+5)
  walletNumber: string; // 3
  bankUse: string; // 21
  walletCode: string; // 1
  occurrenceCode: string; // 2
  documentNumber: string; // 10
  dueDate: string; // 6 (DDMMAA)
  amount: string; // 13 (11+2)
  bankCode: string; // 3
  chargingAgency: string; // 5
  species: string; // 2
  acceptance: string; // 1
  issueDate: string; // 6 (DDMMAA)
  instruction1: string; // 2
  instruction2: string; // 2
  dailyInterest: string; // 13 (11+2)
  discountDate: string; // 6 (DDMMAA)
  discountAmount: string; // 13 (11+2)
  iofAmount: string; // 13 (11+2)
  rebateAmount: string; // 13 (11+2)
  payerTaxIdType: string; // 2
  payerTaxId: string; // 14
  payerName: string; // 30
  blanks2: string; // 10
  payerAddress: string; // 40
  payerNeighborhood: string; // 12
  payerZipCode: string; // 8
  payerCity: string; // 15
  payerState: string; // 2
  drawerGuarantor: string; // 30
  blanks3: string; // 4
  interestStartDate: string; // 6 (DDMMAA)
  protestDays: string; // 2
  blanks4: string; // 1
  sequentialNumber: string; // 6
};

export type ItauCnab400RemessaDetail2 = {
  recordType: "2";
  fineCode: string; // 1
  fineDate: string; // 8 (DDMMAAAA)
  fineAmount: string; // 13 (11+2)
  blanks1: string; // 371
  sequentialNumber: string; // 6
};

export type ItauCnab400RemessaDetail4 = {
  recordType: "4";
  // TODO: Add all fields for rateio if needed, for now only valueType and sequentialNumber
  valueType: string; // 1
  sequentialNumber: string; // 6
};

export type ItauCnab400RemessaDetail5 = {
  recordType: "5";
  payerEmail: string; // 120
  drawerTaxIdType: string; // 2
  drawerTaxId: string; // 14
  drawerAddress: string; // 40
  // TODO: Add all address fields as per spec
  blanks1: string; // 180
  sequentialNumber: string; // 6
};

export type ItauCnab400RemessaTrailer = {
  recordType: "9";
  blanks1: string; // 393
  sequentialNumber: string; // 6
};

export type ItauCnab400RetornoHeader = {
  recordType: "0";
  returnCode: string; // 1
  returnLiteral: "RETORNO"; // 7
  // TODO: Add all fields as per spec
  sequentialNumber: string; // 6
};

export type ItauCnab400RetornoDetail1 = {
  recordType: "1"; // 1
  payerTaxIdType: string; // 2
  payerTaxId: string; // 14
  agency: string; // 4
  account: string; // 5
  dac: string; // 1
  yourNumber: string; // 25
  ourNumber: string; // 8
  walletNumber: string; // 3
  dacOurNumber: string; // 1
  occurrenceCode: string; // 2
  occurrenceDate: string; // 6 (DDMMAA)
  documentNumber: string; // 10
  dueDate: string; // 6 (DDMMAA)
  amount: string; // 13 (11+2)
  bankCode: string; // 3
  chargingAgency: string; // 5
  chargingAgencyDac: string; // 1
  species: string; // 2
  chargingCost: string; // 13 (11+2)
  iofAmount: string; // 13 (11+2)
  downPaymentAmount: string; // 13 (11+2)
  discountAmount: string; // 13 (11+2)
  principalAmount: string; // 13 (11+2)
  moraAmount: string; // 13 (11+2)
  otherCreditAmount: string; // 13 (11+2)
  bankslipDDA: string; // 1
  creditDate: string; // 6 (DDMMAA)
  cancelledInstructionCode: string; // 4
  payerName: string; // 30
  errorCodes: string; // 8
  liquidationCode: string; // 2
  sequentialNumber: string; // 6
};

export type ItauCnab400RetornoTrailer = {
  recordType: "9";
  returnCode: string; // 1
  serviceCode: string; // 2
  bankCode: string; // 3
  blanks1: string; // 10
  simpleCollectionCount: string; // 8
  simpleCollectionValue: string; // 14 (12+2)
  bankNotice: string; // 8
  // TODO: Add all total fields as per spec
  detailCount: string; // 8
  detailTotalValue: string; // 14 (12+2)
  sequentialNumber: string; // 6
};

export type ItauCnab400RemessaRecord =
  | ItauCnab400RemessaHeader
  | ItauCnab400RemessaDetail1
  | ItauCnab400RemessaDetail2
  | ItauCnab400RemessaDetail4
  | ItauCnab400RemessaDetail5
  | ItauCnab400RemessaTrailer;

export type ItauCnab400RetornoRecord =
  | ItauCnab400RetornoHeader
  | ItauCnab400RetornoDetail1
  | ItauCnab400RetornoTrailer;

export type ItauCnab400Record =
  | ItauCnab400RemessaRecord
  | ItauCnab400RetornoRecord;

const prefix = "CNAB ITAU 400";

export function parseRemessa(
  lines: string[],
  layout: number,
): Cnab<ItauCnab400RemessaRecord> {
  const entries: ItauCnab400RemessaRecord[] = [];

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
): Cnab<ItauCnab400RetornoRecord> {
  const entries: ItauCnab400RetornoRecord[] = [];

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

  const layout = lines[0].length;

  if (layout !== 400) {
    throw new UnsupportedLayoutError({ prefix });
  }

  if (lines[0][1] === "1") {
    return parseRemessa(lines, layout);
  } else if (lines[0][1] === "2") {
    return parseRetorno(lines, layout);
  } else {
    throw new UnsupportedLayoutError({
      prefix,
      lineNumber: 1,
      startCol: 0,
      endCol: 1,
    });
  }
}

/**
 * Faz o parsing do header de remessa do arquivo CNAB 400 do Itaú.
 *
 * @param line - Linha do arquivo contendo o header de remessa (400 caracteres)
 * @returns Objeto representando o header de remessa conforme o layout do Itaú
 */
export function parseRemessaHeader(line: string): ItauCnab400RemessaHeader {
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
    bankCode: line.substring(76, 79) as "341",
    bankName: line.substring(79, 94).trim() as "BANCO ITAU SA",
    generationDate: line.substring(94, 100),
    blanks2: line.substring(100, 394),
    sequentialNumber: line.substring(394, 400),
  };
}

export function parseRemessaDetail1(line: string): ItauCnab400RemessaDetail1 {
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
    bankCode: line.substring(139, 142) as "341",
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

export function parseRemessaDetail2(line: string): ItauCnab400RemessaDetail2 {
  return {
    recordType: "2",
    fineCode: line[1],
    fineDate: line.substring(2, 10),
    fineAmount: line.substring(10, 23),
    blanks1: line.substring(23, 394),
    sequentialNumber: line.substring(394, 400),
  };
}

export function parseRemessaDetail4(line: string): ItauCnab400RemessaDetail4 {
  return {
    recordType: "4",
    valueType: line[393],
    sequentialNumber: line.substring(394, 400),
  };
}

export function parseRemessaDetail5(line: string): ItauCnab400RemessaDetail5 {
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

export function parseRemessaTrailer(line: string): ItauCnab400RemessaTrailer {
  return {
    recordType: "9",
    blanks1: line.substring(1, 394),
    sequentialNumber: line.substring(394, 400),
  };
}

export function parseRetornoHeader(line: string): ItauCnab400RetornoHeader {
  return {
    recordType: "0",
    returnCode: line[1],
    returnLiteral: line.substring(2, 9) as "RETORNO",
    sequentialNumber: line.substring(394, 400),
  };
}

export function parseRetornoDetail1(line: string): ItauCnab400RetornoDetail1 {
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
    bankCode: line.substring(165, 168) as "341",
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

export function parseRetornoTrailer(line: string): ItauCnab400RetornoTrailer {
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

export function generate(entries: ItauCnab400Record[]): string {
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
      const e = entry as ItauCnab400RemessaHeader;
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
        num("341", 3) +
        alpha("BANCO ITAU SA", 15) +
        num(e.generationDate, 6) +
        alpha("", 294) +
        num(e.sequentialNumber, 6);
    } else if (entry.recordType === "1") {
      // Detail 1
      const e = entry as ItauCnab400RemessaDetail1;
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
        num("341", 3) +
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
      const e = entry as ItauCnab400RemessaTrailer;
      fileContent += "9" + alpha("", 393) + num(e.sequentialNumber, 6);
    } else {
      throw new Error("Geração não suportada para registros de retorno");
    }
    fileContent += "\n";
  }
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
 * Gera o código de barras completo (44 posições)
 * @param carteira - Código da carteira (3 dígitos)
 * @param nossoNumero - Nosso número (8 dígitos)
 * @param agencia - Código da agência (4 dígitos)
 * @param conta - Código da conta (5 dígitos)
 * @param valor - Valor do título (sem vírgula, ex: 12345 para R$ 123,45)
 * @param fatorVencimento - Fator de vencimento (4 dígitos)
 * @returns O código de barras completo de 44 posições
 */
export function generateCodigoBarras(
  carteira: string,
  nossoNumero: string,
  agencia: string,
  conta: string,
  valor: string,
  fatorVencimento: string,
): string {
  // 1-3: Código do Banco (341)
  const codigoBanco = "341";

  // 4-4: Código da Moeda (9 para Real)
  const codigoMoeda = "9";

  // 5-5: DAC do Código de Barras (será calculado)
  const dacPlaceholder = "0";

  // 6-9: Fator de Vencimento
  const fatorVenc = fatorVencimento.padStart(4, "0");

  // 10-19: Valor do Título (com 2 casas decimais)
  const valorFormatado = valor.padStart(10, "0");

  // 20-44: Campo Livre
  const dacNossoNumero = calculateDacNossoNumero(
    agencia,
    conta,
    carteira,
    nossoNumero,
  );
  const dacAgenciaConta = calculateDacAgenciaConta(agencia, conta);

  const campoLivre =
    carteira.padStart(3, "0") +
    nossoNumero.padStart(8, "0") +
    dacNossoNumero +
    agencia.padStart(4, "0") +
    conta.padStart(5, "0") +
    dacAgenciaConta +
    "000"; // Zeros

  // Montar código de barras sem o DAC (43 posições)
  const codigoBarras43Digitos =
    codigoBanco +
    codigoMoeda +
    dacPlaceholder +
    fatorVenc +
    valorFormatado +
    campoLivre;

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

  // Extrair campos do código de barras
  const campo1Base =
    codigoBarras.substring(0, 4) + codigoBarras.substring(19, 24);
  const campo2Base = codigoBarras.substring(24, 34);
  const campo3Base = codigoBarras.substring(34, 44);
  const campo4 = codigoBarras.substring(4, 5); // DAC do código de barras
  const campo5 = codigoBarras.substring(5, 9) + codigoBarras.substring(10, 20); // Fator + Valor

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
    campo2.substring(5, 10) +
    " " +
    campo3.substring(0, 5) +
    "." +
    campo3.substring(5, 10) +
    " " +
    campo4 +
    " " +
    campo5;

  return linhaDigitavel;
}
