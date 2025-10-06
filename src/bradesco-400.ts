// CNAB 400 Bradesco Types - Strictly per parse-cnab-400-bradesco.mdc

import {
  InvalidRecordTypeError,
  LineLengthError,
  UnsupportedLayoutError,
} from "./utils/errors";
import { Cnab } from "./utils/types";

// ==================== REMESSA TYPES ====================

export type BradescoCnab400RemessaHeader = {
  recordType: "0";
  fileId: "1"; // Identificação do Arquivo-Remessa
  remessaLiteral: "REMESSA";
  serviceCode: "01";
  serviceLiteral: "COBRANCA";
  companyCode: string; // 20 - Código da Empresa fornecido pelo Bradesco
  companyName: string; // 30
  bankCode: "237"; // Número do Bradesco na Câmara de Compensação
  bankName: "BRADESCO"; // 15
  generationDate: string; // 6 (DDMMAA)
  blanks1: string; // 8
  systemId: "MX"; // 2
  remessaSequential: string; // 7
  blanks2: string; // 277
  sequentialNumber: string; // 6
};

export type BradescoCnab400RemessaDetail1 = {
  recordType: "1";
  debitAgency: string; // 5 - Opcional
  debitAgencyDigit: string; // 1 - Opcional
  accountReason: string; // 5 - Opcional
  debitAccount: string; // 7 - Opcional
  debitAccountDigit: string; // 1 - Opcional
  companyIdentification: string; // 17 - Zero, Carteira, Agência e Conta-Corrente
  yourNumber: string; // 25 - Nº Controle do Participante
  bankCode: "237"; // 3
  penaltyField: string; // 1 - 0=sem multa, 2=percentual
  penaltyPercentage: string; // 4
  ourNumber: string; // 11 - Identificação do Título no Banco
  ourNumberDac: string; // 1 - Dígito de Autoconferência
  dailyBonusDiscount: string; // 10
  bankslipEmissionCondition: string; // 1 - 1=Banco emite, 2=Cliente emite
  debitAutoBankslip: string; // 1 - N=Não registra
  bankOperationId: string; // 10 - Brancos
  creditSplitIndicator: string; // 1 - "R" ou branco
  debitAutoNoticeAddress: string; // 1
  paymentsQuantity: string; // 2
  occurrenceCode: string; // 2
  documentNumber: string; // 10
  dueDate: string; // 6 (DDMMAA)
  amount: string; // 13
  chargingBank: string; // 3 - Zeros
  depositoryAgency: string; // 5 - Zeros
  species: string; // 2
  identification: "N"; // 1 - Sempre N
  issueDate: string; // 6 (DDMMAA)
  instruction1: string; // 2
  instruction2: string; // 2
  dailyLateFee: string; // 13
  discountDate: string; // 6 (DDMMAA)
  discountAmount: string; // 13
  iofAmount: string; // 13
  rebateAmount: string; // 13
  payerTaxIdType: string; // 2 - 01=CPF, 02=CNPJ
  payerTaxId: string; // 14
  payerName: string; // 40
  payerAddress: string; // 40
  firstMessage: string; // 12
  payerZipCode: string; // 5
  payerZipSuffix: string; // 3
  finalBeneficiaryOrSecondMessage: string; // 60
  sequentialNumber: string; // 6
};

export type BradescoCnab400RemessaDetail2 = {
  recordType: "2";
  message1: string; // 80
  message2: string; // 80
  message3: string; // 80
  message4: string; // 80
  discountDate2: string; // 6 (DDMMAA)
  discountAmount2: string; // 13
  discountDate3: string; // 6 (DDMMAA)
  discountAmount3: string; // 13
  filler1: string; // 7
  wallet: string; // 3
  agency: string; // 5
  account: string; // 7
  accountDac: string; // 1
  ourNumber: string; // 11
  ourNumberDac: string; // 1
  sequentialNumber: string; // 6
};

export type BradescoCnab400RemessaDetail3 = {
  recordType: "3";
  companyIdentification: string; // 16 - Carteira, Agência, Conta Corrente
  ourNumber: string; // 12
  calculationCode: string; // 1 - 1=Valor Cobrado, 2=Valor do Registro, 3=Menor Valor
  valueType: string; // 1 - 1=Percentual, 2=Valor
  filler1: string; // 12
  beneficiary1BankCode: string; // 3 - Fixo "237"
  beneficiary1Agency: string; // 5
  beneficiary1AgencyDac: string; // 1
  beneficiary1Account: string; // 12
  beneficiary1AccountDac: string; // 1
  beneficiary1Value: string; // 15
  beneficiary1Name: string; // 40
  filler2: string; // 31
  installment: string; // 6
  beneficiary1Floating: string; // 3
  beneficiary2BankCode: string; // 3
  beneficiary2Agency: string; // 5
  beneficiary2AgencyDac: string; // 1
  beneficiary2Account: string; // 12
  beneficiary2AccountDac: string; // 1
  beneficiary2Value: string; // 15
  beneficiary2Name: string; // 40
  filler3: string; // 31
  beneficiary2Floating: string; // 3
  beneficiary3BankCode: string; // 3
  beneficiary3Agency: string; // 5
  beneficiary3AgencyDac: string; // 1
  beneficiary3Account: string; // 12
  beneficiary3AccountDac: string; // 1
  beneficiary3Value: string; // 15
  beneficiary3Name: string; // 40
  filler4: string; // 31
  beneficiary3Floating: string; // 3
  sequentialNumber: string; // 6
};

export type BradescoCnab400RemessaDetail6 = {
  recordType: "6";
  wallet: string; // 3
  agency: string; // 5
  account: string; // 7
  ourNumber: string; // 11
  ourNumberDac: string; // 1
  operationType: string; // 1 - 1=Crédito, 2=Arrendamento, 3=Outros
  useSpecialCheck: string; // 1 - S ou N
  checkBalanceAfterDue: string; // 1 - S ou N
  contractNumber: string; // 25
  contractValidity: string; // 8 - DD/MM/AAAA ou 99999999
  blanks1: string; // 330
  sequentialNumber: string; // 6
};

export type BradescoCnab400RemessaDetail7 = {
  recordType: "7";
  finalBeneficiaryAddress: string; // 45
  zipCode: string; // 5
  zipSuffix: string; // 3
  city: string; // 20
  state: string; // 2
  filler1: string; // 290
  wallet: string; // 3
  agency: string; // 5
  account: string; // 7
  accountDac: string; // 1
  ourNumber: string; // 11
  ourNumberDac: string; // 1
  sequentialNumber: string; // 6
};

export type BradescoCnab400RemessaTrailer = {
  recordType: "9";
  blanks1: string; // 393
  sequentialNumber: string; // 6
};

// ==================== RETORNO TYPES ====================

export type BradescoCnab400RetornoHeader = {
  recordType: "0";
  fileId: "2"; // Identificação do Arquivo-Retorno
  returnLiteral: "RETORNO";
  serviceCode: "01";
  serviceLiteral: "COBRANCA";
  companyCode: string; // 20
  companyName: string; // 30
  bankCode: "237";
  bankName: "BRADESCO";
  generationDate: string; // 6 (DDMMAA)
  recordingDensity: string; // 8 - "01600000"
  bankNoticeNumber: string; // 5
  blanks1: string; // 266
  creditDate: string; // 6 (DDMMAA)
  blanks2: string; // 9
  sequentialNumber: string; // 6
};

export type BradescoCnab400RetornoDetail1 = {
  recordType: "1";
  beneficiaryTaxIdType: string; // 2 - 01=CPF, 02=CNPJ
  beneficiaryTaxId: string; // 14
  zeros1: string; // 3
  companyIdentification: string; // 17
  yourNumber: string; // 25
  zeros2: string; // 8
  ourNumber: string; // 12
  bankUse1: string; // 10
  bankUse2: string; // 12
  creditSplitIndicator: string; // 1 - "R"
  partialPayment: string; // 2
  wallet: string; // 1
  occurrenceCode: string; // 2
  occurrenceDate: string; // 6 (DDMMAA)
  documentNumber: string; // 10
  ourNumberWithDac: string; // 20
  dueDate: string; // 6 (DDMMAA)
  amount: string; // 13
  collectorBank: string; // 3
  collectorAgency: string; // 5
  species: string; // 2
  chargingCost: string; // 13
  otherCosts: string; // 13
  lateOperationInterest: string; // 13
  iofAmount: string; // 13
  rebateAmount: string; // 13
  discountAmount: string; // 13
  paidAmount: string; // 13
  lateInterest: string; // 13
  otherCredits: string; // 13
  blanks1: string; // 2
  occurrenceReason: string; // 1 - A=Aceito, D=Desprezado
  creditDate: string; // 6 (DDMMAA)
  paymentOrigin: string; // 3
  blanks2: string; // 10
  checkBankCode: string; // 4 - 0237 se cheque Bradesco
  rejectionReasons: string; // 10
  blanks3: string; // 40
  notaryNumber: string; // 2
  protocolNumber: string; // 10
  blanks4: string; // 14
  sequentialNumber: string; // 6
};

export type BradescoCnab400RetornoDetail3 = {
  recordType: "3";
  companyIdentification: string; // 16
  ourNumber: string; // 12
  calculationCode: string; // 1
  valueType: string; // 1
  filler1: string; // 12
  beneficiary1BankCode: string; // 3
  beneficiary1Agency: string; // 5
  beneficiary1AgencyDac: string; // 1
  beneficiary1Account: string; // 12
  beneficiary1AccountDac: string; // 1
  beneficiary1EffectiveValue: string; // 15 - Valor efetivo
  beneficiary1Name: string; // 40
  filler2: string; // 31
  installment: string; // 6
  beneficiary1CreditDate: string; // 8 - DDMMAAAA
  beneficiary1Status: string; // 2
  beneficiary2BankCode: string; // 3
  beneficiary2Agency: string; // 5
  beneficiary2AgencyDac: string; // 1
  beneficiary2Account: string; // 12
  beneficiary2AccountDac: string; // 1
  beneficiary2EffectiveValue: string; // 15
  beneficiary2Name: string; // 40
  filler3: string; // 31
  beneficiary2CreditDate: string; // 8
  beneficiary2Status: string; // 2
  beneficiary3BankCode: string; // 3
  beneficiary3Agency: string; // 5
  beneficiary3AgencyDac: string; // 1
  beneficiary3Account: string; // 12
  beneficiary3AccountDac: string; // 1
  beneficiary3EffectiveValue: string; // 15
  beneficiary3Name: string; // 40
  filler4: string; // 31
  beneficiary3CreditDate: string; // 8
  beneficiary3Status: string; // 2
  sequentialNumber: string; // 6
};

export type BradescoCnab400RetornoDetail4 = {
  recordType: "4";
  wallet: string; // 3
  agency: string; // 5
  account: string; // 7
  ourNumber: string; // 11
  ourNumberDac: string; // 1
  pixKeyUrl: string; // 77
  txId: string; // 35
  blanks1: string; // 254
  sequentialNumber: string; // 6
};

export type BradescoCnab400RetornoTrailer = {
  recordType: "9";
  returnId: "2"; // 1
  recordTypeId: "01"; // 2
  bankCode: "237"; // 3
  blanks1: string; // 10
  titlesInCollectionQty: string; // 8
  titlesInCollectionValue: string; // 14
  bankNoticeNumber: string; // 8
  blanks2: string; // 10
  // Totalizadores por ocorrência (58-188)
  occurrence02Qty: string; // 8
  occurrence02Value: string; // 14
  occurrence02BankNotice: string; // 8
  occurrence06Qty: string; // 8
  occurrence06Value: string; // 14
  occurrence06BankNotice: string; // 8
  occurrence09Qty: string; // 8
  occurrence09Value: string; // 14
  occurrence10Qty: string; // 8
  occurrence10Value: string; // 14
  occurrence13Qty: string; // 8
  occurrence13Value: string; // 14
  occurrence14Qty: string; // 8
  occurrence14Value: string; // 14
  occurrence12Qty: string; // 8
  occurrence12Value: string; // 14
  occurrence19Qty: string; // 8
  occurrence19Value: string; // 14
  blanks3: string; // 174
  totalSplitsValue: string; // 15
  totalSplitsQty: string; // 8
  blanks4: string; // 9
  sequentialNumber: string; // 6
};

// ==================== UNION TYPES ====================

export type BradescoCnab400RemessaRecord =
  | BradescoCnab400RemessaHeader
  | BradescoCnab400RemessaDetail1
  | BradescoCnab400RemessaDetail2
  | BradescoCnab400RemessaDetail3
  | BradescoCnab400RemessaDetail6
  | BradescoCnab400RemessaDetail7
  | BradescoCnab400RemessaTrailer;

export type BradescoCnab400RetornoRecord =
  | BradescoCnab400RetornoHeader
  | BradescoCnab400RetornoDetail1
  | BradescoCnab400RetornoDetail3
  | BradescoCnab400RetornoDetail4
  | BradescoCnab400RetornoTrailer;

export type BradescoCnab400Record =
  | BradescoCnab400RemessaRecord
  | BradescoCnab400RetornoRecord;

const prefix = "CNAB BRADESCO 400";

// ==================== PARSE REMESSA ====================

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
      case "3":
        entries.push(parseRemessaDetail3(line));
        break;
      case "6":
        entries.push(parseRemessaDetail6(line));
        break;
      case "7":
        entries.push(parseRemessaDetail7(line));
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

// ==================== PARSE RETORNO ====================

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
      case "3":
        entries.push(parseRetornoDetail3(line));
        break;
      case "4":
        entries.push(parseRetornoDetail4(line));
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

// ==================== MAIN PARSE ====================

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

// ==================== REMESSA PARSERS ====================

/**
 * Faz o parsing do header de remessa do arquivo CNAB 400 do Bradesco.
 *
 * @param line - Linha do arquivo contendo o header de remessa (400 caracteres)
 * @returns Objeto representando o header de remessa conforme o layout do Bradesco
 */
export function parseRemessaHeader(line: string): BradescoCnab400RemessaHeader {
  return {
    recordType: "0",
    fileId: "1",
    remessaLiteral: line.substring(2, 9).trim() as "REMESSA",
    serviceCode: line.substring(9, 11) as "01",
    serviceLiteral: line.substring(11, 26).trim() as "COBRANCA",
    companyCode: line.substring(26, 46),
    companyName: line.substring(46, 76).trim(),
    bankCode: line.substring(76, 79) as "237",
    bankName: line.substring(79, 94).trim() as "BRADESCO",
    generationDate: line.substring(94, 100),
    blanks1: line.substring(100, 108),
    systemId: line.substring(108, 110) as "MX",
    remessaSequential: line.substring(110, 117),
    blanks2: line.substring(117, 394),
    sequentialNumber: line.substring(394, 400),
  };
}

export function parseRemessaDetail1(
  line: string,
): BradescoCnab400RemessaDetail1 {
  return {
    recordType: "1",
    debitAgency: line.substring(1, 6),
    debitAgencyDigit: line[6],
    accountReason: line.substring(7, 12),
    debitAccount: line.substring(12, 19),
    debitAccountDigit: line[19],
    companyIdentification: line.substring(20, 37),
    yourNumber: line.substring(37, 62),
    bankCode: line.substring(62, 65) as "237",
    penaltyField: line[65],
    penaltyPercentage: line.substring(66, 70),
    ourNumber: line.substring(70, 81),
    ourNumberDac: line[81],
    dailyBonusDiscount: line.substring(82, 92),
    bankslipEmissionCondition: line[92],
    debitAutoBankslip: line[93],
    bankOperationId: line.substring(94, 104),
    creditSplitIndicator: line[104],
    debitAutoNoticeAddress: line[105],
    paymentsQuantity: line.substring(106, 108),
    occurrenceCode: line.substring(108, 110),
    documentNumber: line.substring(110, 120),
    dueDate: line.substring(120, 126),
    amount: line.substring(126, 139),
    chargingBank: line.substring(139, 142),
    depositoryAgency: line.substring(142, 147),
    species: line.substring(147, 149),
    identification: line[149] as "N",
    issueDate: line.substring(150, 156),
    instruction1: line.substring(156, 158),
    instruction2: line.substring(158, 160),
    dailyLateFee: line.substring(160, 173),
    discountDate: line.substring(173, 179),
    discountAmount: line.substring(179, 192),
    iofAmount: line.substring(192, 205),
    rebateAmount: line.substring(205, 218),
    payerTaxIdType: line.substring(218, 220),
    payerTaxId: line.substring(220, 234),
    payerName: line.substring(234, 274),
    payerAddress: line.substring(274, 314),
    firstMessage: line.substring(314, 326),
    payerZipCode: line.substring(326, 331),
    payerZipSuffix: line.substring(331, 334),
    finalBeneficiaryOrSecondMessage: line.substring(334, 394),
    sequentialNumber: line.substring(394, 400),
  };
}

export function parseRemessaDetail2(
  line: string,
): BradescoCnab400RemessaDetail2 {
  return {
    recordType: "2",
    message1: line.substring(1, 81),
    message2: line.substring(81, 161),
    message3: line.substring(161, 241),
    message4: line.substring(241, 321),
    discountDate2: line.substring(321, 327),
    discountAmount2: line.substring(327, 340),
    discountDate3: line.substring(340, 346),
    discountAmount3: line.substring(346, 359),
    filler1: line.substring(359, 366),
    wallet: line.substring(366, 369),
    agency: line.substring(369, 374),
    account: line.substring(374, 381),
    accountDac: line[381],
    ourNumber: line.substring(382, 393),
    ourNumberDac: line[393],
    sequentialNumber: line.substring(394, 400),
  };
}

export function parseRemessaDetail3(
  line: string,
): BradescoCnab400RemessaDetail3 {
  return {
    recordType: "3",
    companyIdentification: line.substring(1, 17),
    ourNumber: line.substring(17, 29),
    calculationCode: line[29],
    valueType: line[30],
    filler1: line.substring(31, 43),
    beneficiary1BankCode: line.substring(43, 46),
    beneficiary1Agency: line.substring(46, 51),
    beneficiary1AgencyDac: line[51],
    beneficiary1Account: line.substring(52, 64),
    beneficiary1AccountDac: line[64],
    beneficiary1Value: line.substring(65, 80),
    beneficiary1Name: line.substring(80, 120),
    filler2: line.substring(120, 151),
    installment: line.substring(151, 157),
    beneficiary1Floating: line.substring(157, 160),
    beneficiary2BankCode: line.substring(160, 163),
    beneficiary2Agency: line.substring(163, 168),
    beneficiary2AgencyDac: line[168],
    beneficiary2Account: line.substring(169, 181),
    beneficiary2AccountDac: line[181],
    beneficiary2Value: line.substring(182, 197),
    beneficiary2Name: line.substring(197, 237),
    filler3: line.substring(237, 268),
    beneficiary2Floating: line.substring(268, 271),
    beneficiary3BankCode: line.substring(271, 274),
    beneficiary3Agency: line.substring(274, 279),
    beneficiary3AgencyDac: line[279],
    beneficiary3Account: line.substring(280, 292),
    beneficiary3AccountDac: line[292],
    beneficiary3Value: line.substring(293, 308),
    beneficiary3Name: line.substring(308, 348),
    filler4: line.substring(348, 379),
    beneficiary3Floating: line.substring(379, 382),
    sequentialNumber: line.substring(394, 400),
  };
}

export function parseRemessaDetail6(
  line: string,
): BradescoCnab400RemessaDetail6 {
  return {
    recordType: "6",
    wallet: line.substring(1, 4),
    agency: line.substring(4, 9),
    account: line.substring(9, 16),
    ourNumber: line.substring(16, 27),
    ourNumberDac: line[27],
    operationType: line[28],
    useSpecialCheck: line[29],
    checkBalanceAfterDue: line[30],
    contractNumber: line.substring(31, 56),
    contractValidity: line.substring(56, 64),
    blanks1: line.substring(64, 394),
    sequentialNumber: line.substring(394, 400),
  };
}

export function parseRemessaDetail7(
  line: string,
): BradescoCnab400RemessaDetail7 {
  return {
    recordType: "7",
    finalBeneficiaryAddress: line.substring(1, 46),
    zipCode: line.substring(46, 51),
    zipSuffix: line.substring(51, 54),
    city: line.substring(54, 74),
    state: line.substring(74, 76),
    filler1: line.substring(76, 366),
    wallet: line.substring(366, 369),
    agency: line.substring(369, 374),
    account: line.substring(374, 381),
    accountDac: line[381],
    ourNumber: line.substring(382, 393),
    ourNumberDac: line[393],
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

// ==================== RETORNO PARSERS ====================

export function parseRetornoHeader(line: string): BradescoCnab400RetornoHeader {
  return {
    recordType: "0",
    fileId: "2",
    returnLiteral: line.substring(2, 9).trim() as "RETORNO",
    serviceCode: line.substring(9, 11) as "01",
    serviceLiteral: line.substring(11, 26).trim() as "COBRANCA",
    companyCode: line.substring(26, 46),
    companyName: line.substring(46, 76).trim(),
    bankCode: line.substring(76, 79) as "237",
    bankName: line.substring(79, 94).trim() as "BRADESCO",
    generationDate: line.substring(94, 100),
    recordingDensity: line.substring(100, 108),
    bankNoticeNumber: line.substring(108, 113),
    blanks1: line.substring(113, 379),
    creditDate: line.substring(379, 385),
    blanks2: line.substring(385, 394),
    sequentialNumber: line.substring(394, 400),
  };
}

export function parseRetornoDetail1(
  line: string,
): BradescoCnab400RetornoDetail1 {
  return {
    recordType: "1",
    beneficiaryTaxIdType: line.substring(1, 3),
    beneficiaryTaxId: line.substring(3, 17),
    zeros1: line.substring(17, 20),
    companyIdentification: line.substring(20, 37),
    yourNumber: line.substring(37, 62),
    zeros2: line.substring(62, 70),
    ourNumber: line.substring(70, 81),
    bankUse1: line.substring(82, 92),
    bankUse2: line.substring(92, 104),
    creditSplitIndicator: line[104],
    partialPayment: line.substring(105, 107),
    wallet: line[107],
    occurrenceCode: line.substring(108, 110),
    occurrenceDate: line.substring(110, 116),
    documentNumber: line.substring(116, 126),
    ourNumberWithDac: line.substring(126, 146),
    dueDate: line.substring(146, 152),
    amount: line.substring(152, 165),
    collectorBank: line.substring(165, 168),
    collectorAgency: line.substring(168, 173),
    species: line.substring(173, 175),
    chargingCost: line.substring(175, 188),
    otherCosts: line.substring(188, 201),
    lateOperationInterest: line.substring(201, 214),
    iofAmount: line.substring(214, 227),
    rebateAmount: line.substring(227, 240),
    discountAmount: line.substring(240, 253),
    paidAmount: line.substring(253, 266),
    lateInterest: line.substring(266, 279),
    otherCredits: line.substring(279, 292),
    blanks1: line.substring(292, 294),
    occurrenceReason: line[294],
    creditDate: line.substring(295, 301),
    paymentOrigin: line.substring(301, 304),
    blanks2: line.substring(304, 314),
    checkBankCode: line.substring(314, 318),
    rejectionReasons: line.substring(318, 328),
    blanks3: line.substring(328, 368),
    notaryNumber: line.substring(368, 370),
    protocolNumber: line.substring(370, 380),
    blanks4: line.substring(380, 394),
    sequentialNumber: line.substring(394, 400),
  };
}

export function parseRetornoDetail3(
  line: string,
): BradescoCnab400RetornoDetail3 {
  return {
    recordType: "3",
    companyIdentification: line.substring(1, 17),
    ourNumber: line.substring(17, 29),
    calculationCode: line[29],
    valueType: line[30],
    filler1: line.substring(31, 43),
    beneficiary1BankCode: line.substring(43, 46),
    beneficiary1Agency: line.substring(46, 51),
    beneficiary1AgencyDac: line[51],
    beneficiary1Account: line.substring(52, 64),
    beneficiary1AccountDac: line[64],
    beneficiary1EffectiveValue: line.substring(65, 80),
    beneficiary1Name: line.substring(80, 120),
    filler2: line.substring(120, 151),
    installment: line.substring(151, 157),
    beneficiary1CreditDate: line.substring(150, 158),
    beneficiary1Status: line.substring(158, 160),
    beneficiary2BankCode: line.substring(160, 163),
    beneficiary2Agency: line.substring(163, 168),
    beneficiary2AgencyDac: line[168],
    beneficiary2Account: line.substring(169, 181),
    beneficiary2AccountDac: line[181],
    beneficiary2EffectiveValue: line.substring(182, 197),
    beneficiary2Name: line.substring(197, 237),
    filler3: line.substring(237, 268),
    beneficiary2CreditDate: line.substring(261, 269),
    beneficiary2Status: line.substring(269, 271),
    beneficiary3BankCode: line.substring(271, 274),
    beneficiary3Agency: line.substring(274, 279),
    beneficiary3AgencyDac: line[279],
    beneficiary3Account: line.substring(280, 292),
    beneficiary3AccountDac: line[292],
    beneficiary3EffectiveValue: line.substring(293, 308),
    beneficiary3Name: line.substring(308, 348),
    filler4: line.substring(348, 379),
    beneficiary3CreditDate: line.substring(372, 380),
    beneficiary3Status: line.substring(380, 382),
    sequentialNumber: line.substring(394, 400),
  };
}

export function parseRetornoDetail4(
  line: string,
): BradescoCnab400RetornoDetail4 {
  return {
    recordType: "4",
    wallet: line.substring(1, 4),
    agency: line.substring(4, 9),
    account: line.substring(9, 16),
    ourNumber: line.substring(16, 27),
    ourNumberDac: line[27],
    pixKeyUrl: line.substring(28, 105),
    txId: line.substring(105, 140),
    blanks1: line.substring(140, 394),
    sequentialNumber: line.substring(394, 400),
  };
}

export function parseRetornoTrailer(
  line: string,
): BradescoCnab400RetornoTrailer {
  return {
    recordType: "9",
    returnId: "2",
    recordTypeId: line.substring(2, 4) as "01",
    bankCode: line.substring(4, 7) as "237",
    blanks1: line.substring(7, 17),
    titlesInCollectionQty: line.substring(17, 25),
    titlesInCollectionValue: line.substring(25, 39),
    bankNoticeNumber: line.substring(39, 47),
    blanks2: line.substring(47, 57),
    occurrence02Qty: line.substring(57, 65),
    occurrence02Value: line.substring(65, 79),
    occurrence02BankNotice: line.substring(79, 87),
    occurrence06Qty: line.substring(87, 95),
    occurrence06Value: line.substring(95, 109),
    occurrence06BankNotice: line.substring(109, 117),
    occurrence09Qty: line.substring(117, 125),
    occurrence09Value: line.substring(125, 139),
    occurrence10Qty: line.substring(139, 147),
    occurrence10Value: line.substring(147, 161),
    occurrence13Qty: line.substring(161, 169),
    occurrence13Value: line.substring(169, 183),
    occurrence14Qty: line.substring(183, 191),
    occurrence14Value: line.substring(191, 205),
    occurrence12Qty: line.substring(205, 213),
    occurrence12Value: line.substring(213, 227),
    occurrence19Qty: line.substring(227, 235),
    occurrence19Value: line.substring(235, 249),
    blanks3: line.substring(188, 362),
    totalSplitsValue: line.substring(362, 377),
    totalSplitsQty: line.substring(377, 385),
    blanks4: line.substring(385, 394),
    sequentialNumber: line.substring(394, 400),
  };
}

// ==================== GENERATE ====================

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
      if ("fileId" in entry && entry.fileId === "1") {
        // Remessa Header
        const e = entry as BradescoCnab400RemessaHeader;
        fileContent +=
          "0" +
          "1" +
          alpha("REMESSA", 7) +
          num("01", 2) +
          alpha("COBRANCA", 15) +
          num(e.companyCode, 20) +
          alpha(e.companyName, 30) +
          num("237", 3) +
          alpha("BRADESCO", 15) +
          num(e.generationDate, 6) +
          alpha("", 8) +
          alpha("MX", 2) +
          num(e.remessaSequential, 7) +
          alpha("", 277) +
          num(e.sequentialNumber, 6);
      } else {
        // Retorno Header
        const e = entry as BradescoCnab400RetornoHeader;
        fileContent +=
          "0" +
          "2" +
          alpha("RETORNO", 7) +
          num("01", 2) +
          alpha("COBRANCA", 15) +
          alpha(e.companyCode, 20) +
          alpha(e.companyName, 30) +
          num("237", 3) +
          alpha("BRADESCO", 15) +
          num(e.generationDate, 6) +
          num(e.recordingDensity, 8) +
          num(e.bankNoticeNumber, 5) +
          alpha("", 266) +
          num(e.creditDate, 6) +
          alpha("", 9) +
          num(e.sequentialNumber, 6);
      }
    } else if (entry.recordType === "1") {
      // Detail 1
      const e = entry as BradescoCnab400RemessaDetail1;
      fileContent +=
        "1" +
        num(e.debitAgency, 5) +
        num(e.debitAgencyDigit, 1) +
        num(e.accountReason, 5) +
        num(e.debitAccount, 7) +
        num(e.debitAccountDigit, 1) +
        alpha(e.companyIdentification, 17) +
        alpha(e.yourNumber, 25) +
        num("237", 3) +
        alpha(e.penaltyField, 1) +
        num(e.penaltyPercentage, 4) +
        num(e.ourNumber, 11) +
        num(e.ourNumberDac, 1) +
        num(e.dailyBonusDiscount, 10) +
        alpha(e.bankslipEmissionCondition, 1) +
        alpha(e.debitAutoBankslip, 1) +
        alpha("", 10) +
        alpha(e.creditSplitIndicator, 1) +
        num(e.debitAutoNoticeAddress, 1) +
        alpha(e.paymentsQuantity, 2) +
        num(e.occurrenceCode, 2) +
        alpha(e.documentNumber, 10) +
        num(e.dueDate, 6) +
        num(e.amount, 13) +
        num("000", 3) +
        num("00000", 5) +
        alpha(e.species, 2) +
        alpha("N", 1) +
        num(e.issueDate, 6) +
        num(e.instruction1, 2) +
        num(e.instruction2, 2) +
        num(e.dailyLateFee, 13) +
        num(e.discountDate, 6) +
        num(e.discountAmount, 13) +
        num(e.iofAmount, 13) +
        num(e.rebateAmount, 13) +
        num(e.payerTaxIdType, 2) +
        num(e.payerTaxId, 14) +
        alpha(e.payerName, 40) +
        alpha(e.payerAddress, 40) +
        alpha(e.firstMessage, 12) +
        num(e.payerZipCode, 5) +
        num(e.payerZipSuffix, 3) +
        alpha(e.finalBeneficiaryOrSecondMessage, 60) +
        num(e.sequentialNumber, 6);
    } else if (entry.recordType === "2") {
      // Detail 2
      const e = entry as BradescoCnab400RemessaDetail2;
      fileContent +=
        "2" +
        alpha(e.message1, 80) +
        alpha(e.message2, 80) +
        alpha(e.message3, 80) +
        alpha(e.message4, 80) +
        num(e.discountDate2, 6) +
        num(e.discountAmount2, 13) +
        num(e.discountDate3, 6) +
        num(e.discountAmount3, 13) +
        alpha("", 7) +
        num(e.wallet, 3) +
        num(e.agency, 5) +
        num(e.account, 7) +
        alpha(e.accountDac, 1) +
        num(e.ourNumber, 11) +
        alpha(e.ourNumberDac, 1) +
        num(e.sequentialNumber, 6);
    } else if (entry.recordType === "3") {
      // Detail 3
      const e = entry as BradescoCnab400RemessaDetail3;
      fileContent +=
        "3" +
        alpha(e.companyIdentification, 16) +
        num(e.ourNumber, 12) +
        alpha(e.calculationCode, 1) +
        alpha(e.valueType, 1) +
        alpha("", 12) +
        num(e.beneficiary1BankCode, 3) +
        num(e.beneficiary1Agency, 5) +
        alpha(e.beneficiary1AgencyDac, 1) +
        num(e.beneficiary1Account, 12) +
        alpha(e.beneficiary1AccountDac, 1) +
        num(e.beneficiary1Value, 15) +
        alpha(e.beneficiary1Name, 40) +
        alpha("", 31) +
        num(e.installment, 6) +
        num(e.beneficiary1Floating, 3) +
        num(e.beneficiary2BankCode, 3) +
        num(e.beneficiary2Agency, 5) +
        alpha(e.beneficiary2AgencyDac, 1) +
        num(e.beneficiary2Account, 12) +
        alpha(e.beneficiary2AccountDac, 1) +
        num(e.beneficiary2Value, 15) +
        alpha(e.beneficiary2Name, 40) +
        alpha("", 31) +
        num(e.beneficiary2Floating, 3) +
        num(e.beneficiary3BankCode, 3) +
        num(e.beneficiary3Agency, 5) +
        alpha(e.beneficiary3AgencyDac, 1) +
        num(e.beneficiary3Account, 12) +
        alpha(e.beneficiary3AccountDac, 1) +
        num(e.beneficiary3Value, 15) +
        alpha(e.beneficiary3Name, 40) +
        alpha("", 31) +
        num(e.beneficiary3Floating, 3) +
        num(e.sequentialNumber, 6);
    } else if (entry.recordType === "6") {
      // Detail 6
      const e = entry as BradescoCnab400RemessaDetail6;
      fileContent +=
        "6" +
        num(e.wallet, 3) +
        num(e.agency, 5) +
        num(e.account, 7) +
        num(e.ourNumber, 11) +
        alpha(e.ourNumberDac, 1) +
        alpha(e.operationType, 1) +
        alpha(e.useSpecialCheck, 1) +
        alpha(e.checkBalanceAfterDue, 1) +
        alpha(e.contractNumber, 25) +
        num(e.contractValidity, 8) +
        alpha("", 330) +
        num(e.sequentialNumber, 6);
    } else if (entry.recordType === "7") {
      // Detail 7
      const e = entry as BradescoCnab400RemessaDetail7;
      fileContent +=
        "7" +
        alpha(e.finalBeneficiaryAddress, 45) +
        num(e.zipCode, 5) +
        num(e.zipSuffix, 3) +
        alpha(e.city, 20) +
        alpha(e.state, 2) +
        alpha("", 290) +
        num(e.wallet, 3) +
        num(e.agency, 5) +
        num(e.account, 7) +
        alpha(e.accountDac, 1) +
        num(e.ourNumber, 11) +
        alpha(e.ourNumberDac, 1) +
        num(e.sequentialNumber, 6);
    } else if (entry.recordType === "9") {
      // Trailer
      const e = entry as BradescoCnab400RemessaTrailer;
      fileContent += "9" + alpha("", 393) + num(e.sequentialNumber, 6);
    }
    fileContent += "\r\n";
  }
  return fileContent;
}

// ==================== DAC CALCULATION ====================

/**
 * Calcula o DAC da Agência/Conta (Módulo 11)
 * @param agencia - Código da agência (4 dígitos)
 * @param conta - Código da conta (7 dígitos)
 * @returns O DAC calculado
 */
export function calculateDacAgenciaConta(
  agencia: string,
  conta: string,
): string {
  const baseCalculo =
    agencia.padStart(4, "0").slice(-4) + conta.padStart(7, "0").slice(-7);

  const pesos = [2, 3, 4, 5, 6, 7];
  let soma = 0;

  for (let i = baseCalculo.length - 1; i >= 0; i--) {
    const digito = parseInt(baseCalculo[i]);
    const peso = pesos[(baseCalculo.length - 1 - i) % 6];
    soma += digito * peso;
  }

  const resto = soma % 11;

  if (resto === 0) {
    return "0";
  } else if (resto === 1) {
    return "0";
  } else {
    return (11 - resto).toString();
  }
}

/**
 * Calcula o DAC do Nosso Número do Bradesco (Módulo 11 base 7)
 * Conforme documentação: Carteira (3) + Nosso Número (11)
 *
 * @param carteira - Código da carteira (3 dígitos)
 * @param nossoNumero - Nosso número (11 dígitos)
 * @returns O DAC calculado (string)
 */
export function calculateDacNossoNumero(
  carteira: string,
  nossoNumero: string,
): string {
  const baseCalculo =
    carteira.padStart(3, "0").slice(-3) +
    nossoNumero.padStart(11, "0").slice(-11);

  // Sequência de pesos: 2, 3, 4, 5, 6, 7, 2, 3, 4, 5, 6, 7, ...
  const pesos = [2, 3, 4, 5, 6, 7];
  let soma = 0;

  // Multiplicar da direita para a esquerda
  for (let i = baseCalculo.length - 1; i >= 0; i--) {
    const digito = parseInt(baseCalculo[i]);
    const peso = pesos[(baseCalculo.length - 1 - i) % 6];
    soma += digito * peso;
  }

  const resto = soma % 11;

  // Exceções conforme documentação
  if (resto === 0) {
    return "0";
  } else if (resto === 1) {
    return "P"; // 11-1 = 10
  } else {
    return (11 - resto).toString();
  }
}

/**
 * Calcula o DAC do Código de Barras (Módulo 11)
 * @param codigoBarras43Digitos - Os 43 dígitos do código de barras (sem a 5ª posição)
 * @returns O DAC calculado
 */
export function calculateDacCodigoBarras(
  codigoBarras43Digitos: string,
): string {
  if (codigoBarras43Digitos.length !== 43) {
    throw new Error("Código de barras deve ter exatamente 43 dígitos");
  }

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
 * @param campo - O campo para calcular o DAC
 * @returns O DAC calculado
 */
export function calculateDacRepresentacaoNumerica(campo: string): string {
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
 * Calcula o fator de vencimento para boletos bancários.
 * Para Bradesco: data base 07/10/1997
 *
 * @param dueDate - Data de vencimento como objeto Date (UTC).
 * @returns O fator de vencimento com 4 dígitos, como string.
 */
export function calculateDueFactor(dueDate: Date): string {
  const base = Date.UTC(1997, 9, 7); // 07/10/1997
  const actualDate = Date.UTC(
    dueDate.getUTCFullYear(),
    dueDate.getUTCMonth(),
    dueDate.getUTCDate(),
  );
  const daysDiff = Math.floor((actualDate - base) / (1000 * 60 * 60 * 24));

  let factor = 0;

  if (daysDiff <= 9999) {
    factor = daysDiff;
  } else {
    // A partir de 22/02/2025, retorna para 1000
    factor = ((daysDiff % 9000) + 9000) % 9000;
  }

  const dueFactor = factor.toString().padStart(4, "0");

  return dueFactor;
}

/**
 * Gera o código de barras completo (44 posições) para Bradesco
 * @param carteira - Código da carteira (3 dígitos)
 * @param nossoNumero - Nosso número (11 dígitos)
 * @param agencia - Código da agência (4 dígitos)
 * @param conta - Código da conta (7 dígitos)
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

  // 20-44: Campo Livre (25 posições)
  // Carteira (3) + Nosso Número (11) + Agência (4) + Conta (7) + Zero (1)

  const campoLivre =
    agencia.padStart(4, "0").slice(-4) +
    carteira.padStart(2, "0").slice(-2) +
    nossoNumero.padStart(11, "0").slice(-11) +
    conta.padStart(7, "0").slice(-7) +
    "0"; // Zero final

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
 * Gera a linha digitável (IPTE - 47 posições) para Bradesco
 * @param codigoBarras - Código de barras completo (44 posições)
 * @returns A linha digitável formatada
 */
export function generateLinhaDigitavel(codigoBarras: string): string {
  if (codigoBarras.length !== 44) {
    throw new Error("Código de barras deve ter exatamente 44 posições");
  }

  // Extrair campos do código de barras
  const bankCode = codigoBarras.substring(0, 3); // 237
  const currencyCode = codigoBarras.substring(3, 4); // 9
  const dacBarcode = codigoBarras.substring(4, 5);
  const dueFactor = codigoBarras.substring(5, 9);
  const value = codigoBarras.substring(9, 19);
  const freeField = codigoBarras.substring(19, 44); // 25 posições

  // Campo 1: Banco (3) + Moeda (1) + Primeiros 5 do campo livre
  const campo1Base = bankCode + currencyCode + freeField.substring(0, 5);
  const dacCampo1 = calculateDacRepresentacaoNumerica(campo1Base);
  const campo1 = campo1Base + dacCampo1;

  // Campo 2: Próximos 10 do campo livre
  const campo2Base = freeField.substring(5, 15);
  const dacCampo2 = calculateDacRepresentacaoNumerica(campo2Base);
  const campo2 = campo2Base + dacCampo2;

  // Campo 3: Últimos 10 do campo livre
  const campo3Base = freeField.substring(15, 25);
  const dacCampo3 = calculateDacRepresentacaoNumerica(campo3Base);
  const campo3 = campo3Base + dacCampo3;

  // Campo 4: DAC do código de barras
  const campo4 = dacBarcode;

  // Campo 5: Fator de vencimento + Valor
  const campo5 = dueFactor + value;

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
