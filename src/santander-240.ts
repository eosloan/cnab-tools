// CNAB 240 Santander Types - Strictly per parse-cnab-240-santander.mdc

import {
  InvalidRecordTypeError,
  LineLengthError,
  UnsupportedLayoutError,
} from "./utils/errors";
import { Cnab } from "./utils/types";

// ============================================================================
// Type Definitions
// ============================================================================

export type SantanderCnab240RemessaFileHeader = {
  recordType: "0";
  bankCode: "033";
  batchNumber: string; // 4 - "0000"
  fileType: "REMESSA";
  filler1: string; // 8
  companyTaxIdTypeCode: string; // 1
  companyTaxId: string; // 15
  transmissionCode: string; // 15
  filler2: string; // 25
  companyName: string; // 30
  bankName: string; // 30
  filler3: string; // 10
  fileTypeCode: "1";
  creationDate: string; // 8 (DDMMAAAA)
  filler4: string; // 6
  fileSequenceNumber: string; // 6
  layoutVersion: "040";
  filler5: string; // 74
};

export type SantanderCnab240RetornoFileHeader = {
  recordType: "0";
  bankCode: "033";
  batchNumber: string; // 4 - "0000"
  fileType: "RETORNO";
  filler1: string; // 8
  companyTaxIdTypeCode: string; // 1
  companyTaxId: string; // 15
  beneficiaryBranchNumber: string; // 4
  beneficiaryBranchCode: string; // 1
  beneficiaryAccountNumber: string; // 9
  beneficiaryAccountCode: string; // 1
  filler2: string; // 5
  beneficiaryCode: string; // 9
  filler3: string; // 11
  companyName: string; // 30
  bankName: string; // 30
  filler4: string; // 10
  fileTypeCode: "2";
  creationDate: string; // 8 (DDMMAAAA)
  filler5: string; // 6
  fileSequenceNumber: string; // 6
  layoutVersion: "040";
  filler6: string; // 74
};

export type SantanderCnab240RemessaBatchHeader = {
  recordType: "1";
  bankCode: "033";
  batchNumber: string; // 4
  fileType: "REMESSA";
  operationTypeCode: "R";
  serviceTypeCode: string; // 2
  filler1: string; // 2
  batchVersion: string; // 3
  filler2: string; // 1
  companyTaxIdTypeCode: string; // 1
  companyTaxId: string; // 15
  filler3: string; // 20
  transmissionCode: string; // 15
  filler4: string; // 5
  companyName: string; // 30
  message1: string; // 40
  message2: string; // 40
  operationNumber: string; // 8
  creationDate: string; // 8 (DDMMAAAA)
  filler5: string; // 41
};

export type SantanderCnab240RetornoBatchHeader = {
  recordType: "1";
  bankCode: "033";
  batchNumber: string; // 4
  fileType: "RETORNO";
  operationTypeCode: "T";
  serviceTypeCode: string; // 2
  filler1: string; // 2
  batchVersion: string; // 3
  filler2: string; // 1
  companyTaxIdTypeCode: string; // 1
  companyTaxId: string; // 15
  beneficiaryCode: string; // 9
  filler3: string; // 11
  beneficiaryBranchNumber: string; // 4
  beneficiaryBranchCode: string; // 1
  beneficiaryAccountNumber: string; // 9
  beneficiaryAccountCode: string; // 1
  filler4: string; // 5
  companyName: string; // 30
  filler5: string; // 80
  returnNumber: string; // 8
  creationDate: string; // 8 (DDMMAAAA)
  filler6: string; // 41
};

export type SantanderCnab240SegmentP = {
  recordType: "3";
  bankCode: "033";
  batchNumber: string; // 4
  segmentCode: "P";
  batchIndex: string; // 5
  filler1: string; // 1
  movementCode: string; // 2
  branchNumber: string; // 4
  branchCode: string; // 1
  accountNumber: string; // 9
  accountCode: string; // 1
  destFIDCAccountNumber: string; // 9
  destFIDCAccountCode: string; // 1
  filler2: string; // 2
  ourNumber: string; // 13
  invoiceTypeCode: string; // 1
  registerTypeCode: string; // 1
  documentTypeCode: string; // 1
  filler3: string; // 1
  filler4: string; // 1
  documentNumber: string; // 15
  dueDate: string; // 8 (DDMMAAAA)
  amount: string; // 15
  fidcBranchNumber: string; // 4
  fidcBranchCode: string; // 1
  filler5: string; // 1
  speciesCode: string; // 2
  acceptedCode: string; // 1
  createdAt: string; // 8 (DDMMAAAA)
  moraTaxCode: string; // 1
  moraTaxDate: string; // 8 (DDMMAAAA)
  moraTaxAmount: string; // 15
  discountCode1: string; // 1
  discountDate1: string; // 8 (DDMMAAAA)
  discountAmount1: string; // 15
  iofPercentage: string; // 15
  iofAmount: string; // 15
  yourNumber: string; // 25
  protestCode: string; // 1
  protestDays: string; // 2
  returnCode: string; // 1
  filler6: string; // 1
  returnDays: string; // 2
  currencyCode: string; // 2
  filler7: string; // 11
};

export type SantanderCnab240SegmentQ = {
  recordType: "3";
  bankCode: "033";
  batchNumber: string; // 4
  segmentCode: "Q";
  batchIndex: string; // 5
  filler1: string; // 1
  movementCode: string; // 2
  payerTaxIdTypeCode: string; // 1
  payerTaxId: string; // 15
  payerName: string; // 40
  payerAddress: string; // 40
  payerNeighborhood: string; // 15
  payerZipcode: string; // 5
  payerZipcodeSuffix: string; // 3
  payerCity: string; // 15
  payerState: string; // 2
  beneficiaryTaxIdTypeCode: string; // 1
  beneficiaryTaxId: string; // 15
  beneficiaryName: string; // 40
  filler2: string; // 3
  filler3: string; // 3
  filler4: string; // 3
  filler5: string; // 3
  filler6: string; // 19
};

export type SantanderCnab240SegmentR = {
  recordType: "3";
  bankCode: "033";
  batchNumber: string; // 4
  segmentCode: "R";
  batchIndex: string; // 5
  filler1: string; // 1
  movementCode: string; // 2
  discountCode2: string; // 1
  discountDate2: string; // 8 (DDMMAAAA)
  discountAmount2: string; // 15
  discountCode3: string; // 1
  discountDate3: string; // 8 (DDMMAAAA)
  discountAmount3: string; // 15
  penaltyTypeCode: string; // 1
  penaltyDate: string; // 8 (DDMMAAAA)
  penaltyAmount: string; // 15
  filler2: string; // 10
  message3: string; // 40
  message4: string; // 40
  filler3: string; // 61
};

export type SantanderCnab240SegmentS =
  | {
      recordType: "3";
      bankCode: "033";
      batchNumber: string; // 4
      segmentCode: "S";
      batchIndex: string; // 5
      filler1: string; // 1
      movementCode: string; // 2
      printingCode: "1";
      printingLine: string; // 2
      receiptMessageCode: string; // 1
      receiptMessage: string; // 100
      filler2: string; // 119
    }
  | {
      recordType: "3";
      bankCode: "033";
      batchNumber: string; // 4
      segmentCode: "S";
      batchIndex: string; // 5
      filler1: string; // 1
      movementCode: string; // 2
      printingCode: "2";
      message5: string; // 40
      message6: string; // 40
      message7: string; // 40
      message8: string; // 40
      message9: string; // 40
      filler2: string; // 22
    };

export type SantanderCnab240SegmentY03 = {
  recordType: "3";
  bankCode: "033";
  batchNumber: string; // 4
  segmentCode: "Y";
  batchIndex: string; // 5
  filler1: string; // 1
  movementCode: string; // 2
  identificationRegister: "03";
  filler2: string; // 62
  pixKeyType: string; // 1
  pixKey: string; // 77
  txid: string; // 35
  filler3: string; // 46
};

export type SantanderCnab240SegmentY53 = {
  recordType: "3";
  bankCode: "033";
  batchNumber: string; // 4
  segmentCode: "Y";
  batchIndex: string; // 5
  filler1: string; // 1
  movementCode: string; // 2
  identificationRegister: "53";
  paymentTypeCode: string; // 2
  paymentCount: string; // 2
  maxValueType: string; // 1
  maxValue: string; // 15
  minValueType: string; // 1
  minValue: string; // 15
  filler2: string; // 185
};

export type SantanderCnab240SegmentT = {
  recordType: "3";
  bankCode: "033";
  batchNumber: string; // 4
  segmentCode: "T";
  batchIndex: string; // 5
  filler1: string; // 1
  movementCode: string; // 2
  beneficiaryBranchNumber: string; // 4
  beneficiaryBranchCode: string; // 1
  beneficiaryAccountNumber: string; // 9
  beneficiaryAccountCode: string; // 1
  filler2: string; // 8
  ourNumber: string; // 13
  portfolioCode: string; // 1
  yourNumber: string; // 15
  dueDate: string; // 8 (DDMMAAAA)
  amount: string; // 15
  invoiceBankCode: string; // 3
  invoiceBankBranchNumber: string; // 4
  invoiceBankBranchCode: string; // 1
  optionalId: string; // 25
  currencyCode: string; // 2
  payerTaxIdTypeCode: string; // 1
  payerTaxId: string; // 15
  payerName: string; // 40
  contaCobranca: string; // 10
  taxAmount: string; // 15
  errorCodes: string; // 10
  filler3: string; // 22
};

export type SantanderCnab240SegmentU = {
  recordType: "3";
  bankCode: "033";
  batchNumber: string; // 4
  segmentCode: "U";
  batchIndex: string; // 5
  filler1: string; // 1
  movementCode: string; // 2
  taxAmount: string; // 15
  discountAmount: string; // 15
  downPaymentAmount: string; // 15
  iofAmount: string; // 15
  paidAmount: string; // 15
  netAmount: string; // 15
  otherAmount: string; // 15
  otherCreditAmount: string; // 15
  occurenceDate: string; // 8 (DDMMAAAA)
  creditDate: string; // 8 (DDMMAAAA)
  payerOccurrenceCode: string; // 4
  payerOccurenceDate: string; // 8 (DDMMAAAA)
  payerOccurenceAmount: string; // 15
  payerOccurenceComplement: string; // 30
  correspondentBankCode: string; // 3
  filler2: string; // 27
};

export type SantanderCnab240SegmentY04 = {
  recordType: "3";
  bankCode: "033";
  batchNumber: string; // 4
  segmentCode: "Y";
  batchIndex: string; // 5
  filler1: string; // 1
  movementCode: string; // 2
  identificationRegister: "04";
  filler2: string; // 221
};

export type SantanderCnab240BatchTrailer = {
  recordType: "5";
  bankCode: "033";
  batchNumber: string; // 4
  filler1: string; // 9
  recordCount: string; // 6
  simpleInvoiceCount: string; // 6
  simpleInvoiceAmount: string; // 17
  filler2: string; // 197
};

export type SantanderCnab240FileTrailer = {
  recordType: "9";
  bankCode: "033";
  batchNumber: string; // 4 - "9999"
  filler1: string; // 9
  batchCount: string; // 6
  recordCount: string; // 6
  filler2: string; // 211
};

export type SantanderCnab240RemessaRecord =
  | SantanderCnab240RemessaFileHeader
  | SantanderCnab240RemessaBatchHeader
  | SantanderCnab240SegmentP
  | SantanderCnab240SegmentQ
  | SantanderCnab240SegmentR
  | SantanderCnab240SegmentS
  | SantanderCnab240SegmentY03
  | SantanderCnab240SegmentY53
  | SantanderCnab240BatchTrailer
  | SantanderCnab240FileTrailer;

export type SantanderCnab240RetornoRecord =
  | SantanderCnab240RetornoFileHeader
  | SantanderCnab240RetornoBatchHeader
  | SantanderCnab240SegmentT
  | SantanderCnab240SegmentU
  | SantanderCnab240SegmentY03
  | SantanderCnab240SegmentY04
  | SantanderCnab240BatchTrailer
  | SantanderCnab240FileTrailer;

export type SantanderCnab240Record =
  | SantanderCnab240RemessaRecord
  | SantanderCnab240RetornoRecord;

const prefix = "CNAB SANTANDER 240";

// ============================================================================
// Parsing Functions
// ============================================================================

export function parseRemessaFileHeader(
  line: string,
): SantanderCnab240RemessaFileHeader {
  return {
    recordType: "0",
    bankCode: "033",
    batchNumber: line.substring(3, 7),
    fileType: "REMESSA",
    filler1: line.substring(8, 16),
    companyTaxIdTypeCode: line[16],
    companyTaxId: line.substring(17, 32),
    transmissionCode: line.substring(32, 47),
    filler2: line.substring(47, 72),
    companyName: line.substring(72, 102).trim(),
    bankName: line.substring(102, 132).trim(),
    filler3: line.substring(132, 142),
    fileTypeCode: "1",
    creationDate: line.substring(143, 151),
    filler4: line.substring(151, 157),
    fileSequenceNumber: line.substring(157, 163),
    layoutVersion: "040",
    filler5: line.substring(166, 240),
  };
}

export function parseRetornoFileHeader(
  line: string,
): SantanderCnab240RetornoFileHeader {
  return {
    recordType: "0",
    bankCode: "033",
    batchNumber: line.substring(3, 7),
    fileType: "RETORNO",
    filler1: line.substring(8, 16),
    companyTaxIdTypeCode: line[16],
    companyTaxId: line.substring(17, 32),
    beneficiaryBranchNumber: line.substring(32, 36),
    beneficiaryBranchCode: line[36],
    beneficiaryAccountNumber: line.substring(37, 46),
    beneficiaryAccountCode: line[46],
    filler2: line.substring(47, 52),
    beneficiaryCode: line.substring(52, 61),
    filler3: line.substring(61, 72),
    companyName: line.substring(72, 102).trim(),
    bankName: line.substring(102, 132).trim(),
    filler4: line.substring(132, 142),
    fileTypeCode: "2",
    creationDate: line.substring(143, 151),
    filler5: line.substring(151, 157),
    fileSequenceNumber: line.substring(157, 163),
    layoutVersion: "040",
    filler6: line.substring(166, 240),
  };
}

export function parseRemessaBatchHeader(
  line: string,
): SantanderCnab240RemessaBatchHeader {
  return {
    recordType: "1",
    bankCode: "033",
    batchNumber: line.substring(3, 7),
    fileType: "REMESSA",
    operationTypeCode: "R",
    serviceTypeCode: line.substring(9, 11),
    filler1: line.substring(11, 13),
    batchVersion: line.substring(13, 16),
    filler2: line[16],
    companyTaxIdTypeCode: line[17],
    companyTaxId: line.substring(18, 33),
    filler3: line.substring(33, 53),
    transmissionCode: line.substring(53, 68),
    filler4: line.substring(68, 73),
    companyName: line.substring(73, 103).trim(),
    message1: line.substring(103, 143).trim(),
    message2: line.substring(143, 183).trim(),
    operationNumber: line.substring(183, 191),
    creationDate: line.substring(191, 199),
    filler5: line.substring(199, 240),
  };
}

export function parseRetornoBatchHeader(
  line: string,
): SantanderCnab240RetornoBatchHeader {
  return {
    recordType: "1",
    bankCode: "033",
    batchNumber: line.substring(3, 7),
    fileType: "RETORNO",
    operationTypeCode: "T",
    serviceTypeCode: line.substring(9, 11),
    filler1: line.substring(11, 13),
    batchVersion: line.substring(13, 16),
    filler2: line[16],
    companyTaxIdTypeCode: line[17],
    companyTaxId: line.substring(18, 33),
    beneficiaryCode: line.substring(33, 42),
    filler3: line.substring(42, 53),
    beneficiaryBranchNumber: line.substring(53, 57),
    beneficiaryBranchCode: line[57],
    beneficiaryAccountNumber: line.substring(58, 67),
    beneficiaryAccountCode: line[67],
    filler4: line.substring(68, 73),
    companyName: line.substring(73, 103).trim(),
    filler5: line.substring(103, 183),
    returnNumber: line.substring(183, 191),
    creationDate: line.substring(191, 199),
    filler6: line.substring(199, 240),
  };
}

export function parseSegmentP(line: string): SantanderCnab240SegmentP {
  return {
    recordType: "3",
    bankCode: "033",
    batchNumber: line.substring(3, 7),
    segmentCode: "P",
    batchIndex: line.substring(8, 13),
    filler1: line[14],
    movementCode: line.substring(15, 17),
    branchNumber: line.substring(17, 21),
    branchCode: line[21],
    accountNumber: line.substring(22, 31),
    accountCode: line[31],
    destFIDCAccountNumber: line.substring(32, 41),
    destFIDCAccountCode: line[41],
    filler2: line.substring(42, 44),
    ourNumber: line.substring(44, 57),
    invoiceTypeCode: line[57],
    registerTypeCode: line[58],
    documentTypeCode: line[59],
    filler3: line[60],
    filler4: line[61],
    documentNumber: line.substring(62, 77),
    dueDate: line.substring(77, 85),
    amount: line.substring(85, 100),
    fidcBranchNumber: line.substring(100, 104),
    fidcBranchCode: line[104],
    filler5: line[105],
    speciesCode: line.substring(106, 108),
    acceptedCode: line[108],
    createdAt: line.substring(109, 117),
    moraTaxCode: line[117],
    moraTaxDate: line.substring(118, 126),
    moraTaxAmount: line.substring(126, 141),
    discountCode1: line[141],
    discountDate1: line.substring(142, 150),
    discountAmount1: line.substring(150, 165),
    iofPercentage: line.substring(165, 180),
    iofAmount: line.substring(180, 195),
    yourNumber: line.substring(195, 220).trim(),
    protestCode: line[220],
    protestDays: line.substring(221, 223),
    returnCode: line[223],
    filler6: line[224],
    returnDays: line.substring(225, 227),
    currencyCode: line.substring(227, 229),
    filler7: line.substring(229, 240),
  };
}

export function parseSegmentQ(line: string): SantanderCnab240SegmentQ {
  return {
    recordType: "3",
    bankCode: "033",
    batchNumber: line.substring(3, 7),
    segmentCode: "Q",
    batchIndex: line.substring(8, 13),
    filler1: line[14],
    movementCode: line.substring(15, 17),
    payerTaxIdTypeCode: line[17],
    payerTaxId: line.substring(18, 33),
    payerName: line.substring(33, 73).trim(),
    payerAddress: line.substring(73, 113).trim(),
    payerNeighborhood: line.substring(113, 128).trim(),
    payerZipcode: line.substring(128, 133),
    payerZipcodeSuffix: line.substring(133, 136),
    payerCity: line.substring(136, 151).trim(),
    payerState: line.substring(151, 153),
    beneficiaryTaxIdTypeCode: line[153],
    beneficiaryTaxId: line.substring(154, 169),
    beneficiaryName: line.substring(169, 209).trim(),
    filler2: line.substring(209, 212),
    filler3: line.substring(212, 215),
    filler4: line.substring(215, 218),
    filler5: line.substring(218, 221),
    filler6: line.substring(221, 240),
  };
}

export function parseSegmentR(line: string): SantanderCnab240SegmentR {
  return {
    recordType: "3",
    bankCode: "033",
    batchNumber: line.substring(3, 7),
    segmentCode: "R",
    batchIndex: line.substring(8, 13),
    filler1: line[14],
    movementCode: line.substring(15, 17),
    discountCode2: line[17],
    discountDate2: line.substring(18, 26),
    discountAmount2: line.substring(26, 41),
    discountCode3: line[41],
    discountDate3: line.substring(42, 50),
    discountAmount3: line.substring(50, 65),
    penaltyTypeCode: line[65],
    penaltyDate: line.substring(66, 74),
    penaltyAmount: line.substring(74, 89),
    filler2: line.substring(89, 99),
    message3: line.substring(99, 139).trim(),
    message4: line.substring(139, 179).trim(),
    filler3: line.substring(179, 240),
  };
}

export function parseSegmentS(line: string): SantanderCnab240SegmentS {
  const printingCode = line[17];

  if (printingCode === "1") {
    return {
      recordType: "3",
      bankCode: "033",
      batchNumber: line.substring(3, 7),
      segmentCode: "S",
      batchIndex: line.substring(8, 13),
      filler1: line[14],
      movementCode: line.substring(15, 17),
      printingCode: "1",
      printingLine: line.substring(18, 20),
      receiptMessageCode: line[20],
      receiptMessage: line.substring(21, 121).trim(),
      filler2: line.substring(121, 240),
    };
  } else {
    return {
      recordType: "3",
      bankCode: "033",
      batchNumber: line.substring(3, 7),
      segmentCode: "S",
      batchIndex: line.substring(8, 13),
      filler1: line[14],
      movementCode: line.substring(15, 17),
      printingCode: "2",
      message5: line.substring(18, 58).trim(),
      message6: line.substring(58, 98).trim(),
      message7: line.substring(98, 138).trim(),
      message8: line.substring(138, 178).trim(),
      message9: line.substring(178, 218).trim(),
      filler2: line.substring(218, 240),
    };
  }
}

export function parseSegmentY03(line: string): SantanderCnab240SegmentY03 {
  return {
    recordType: "3",
    bankCode: "033",
    batchNumber: line.substring(3, 7),
    segmentCode: "Y",
    batchIndex: line.substring(8, 13),
    filler1: line[14],
    movementCode: line.substring(15, 17),
    identificationRegister: "03",
    filler2: line.substring(19, 81),
    pixKeyType: line[81],
    pixKey: line.substring(82, 159).trim(),
    txid: line.substring(159, 194).trim(),
    filler3: line.substring(194, 240),
  };
}

export function parseSegmentY53(line: string): SantanderCnab240SegmentY53 {
  return {
    recordType: "3",
    bankCode: "033",
    batchNumber: line.substring(3, 7),
    segmentCode: "Y",
    batchIndex: line.substring(8, 13),
    filler1: line[14],
    movementCode: line.substring(15, 17),
    identificationRegister: "53",
    paymentTypeCode: line.substring(19, 21),
    paymentCount: line.substring(21, 23),
    maxValueType: line[23],
    maxValue: line.substring(24, 39),
    minValueType: line[39],
    minValue: line.substring(40, 55),
    filler2: line.substring(55, 240),
  };
}

export function parseSegmentT(line: string): SantanderCnab240SegmentT {
  return {
    recordType: "3",
    bankCode: "033",
    batchNumber: line.substring(3, 7),
    segmentCode: "T",
    batchIndex: line.substring(8, 13),
    filler1: line[14],
    movementCode: line.substring(15, 17),
    beneficiaryBranchNumber: line.substring(17, 21),
    beneficiaryBranchCode: line[21],
    beneficiaryAccountNumber: line.substring(22, 31),
    beneficiaryAccountCode: line[31],
    filler2: line.substring(32, 40),
    ourNumber: line.substring(40, 53),
    portfolioCode: line[53],
    yourNumber: line.substring(54, 69).trim(),
    dueDate: line.substring(69, 77),
    amount: line.substring(77, 92),
    invoiceBankCode: line.substring(92, 95),
    invoiceBankBranchNumber: line.substring(95, 99),
    invoiceBankBranchCode: line[99],
    optionalId: line.substring(100, 125).trim(),
    currencyCode: line.substring(125, 127),
    payerTaxIdTypeCode: line[127],
    payerTaxId: line.substring(128, 143),
    payerName: line.substring(143, 183).trim(),
    contaCobranca: line.substring(183, 193),
    taxAmount: line.substring(193, 208),
    errorCodes: line.substring(208, 218),
    filler3: line.substring(218, 240),
  };
}

export function parseSegmentU(line: string): SantanderCnab240SegmentU {
  return {
    recordType: "3",
    bankCode: "033",
    batchNumber: line.substring(3, 7),
    segmentCode: "U",
    batchIndex: line.substring(8, 13),
    filler1: line[14],
    movementCode: line.substring(15, 17),
    taxAmount: line.substring(17, 32),
    discountAmount: line.substring(32, 47),
    downPaymentAmount: line.substring(47, 62),
    iofAmount: line.substring(62, 77),
    paidAmount: line.substring(77, 92),
    netAmount: line.substring(92, 107),
    otherAmount: line.substring(107, 122),
    otherCreditAmount: line.substring(122, 137),
    occurenceDate: line.substring(137, 145),
    creditDate: line.substring(145, 153),
    payerOccurrenceCode: line.substring(153, 157),
    payerOccurenceDate: line.substring(157, 165),
    payerOccurenceAmount: line.substring(165, 180),
    payerOccurenceComplement: line.substring(180, 210).trim(),
    correspondentBankCode: line.substring(210, 213),
    filler2: line.substring(213, 240),
  };
}

export function parseSegmentY04(line: string): SantanderCnab240SegmentY04 {
  return {
    recordType: "3",
    bankCode: "033",
    batchNumber: line.substring(3, 7),
    segmentCode: "Y",
    batchIndex: line.substring(8, 13),
    filler1: line[14],
    movementCode: line.substring(15, 17),
    identificationRegister: "04",
    filler2: line.substring(19, 240),
  };
}

export function parseBatchTrailer(line: string): SantanderCnab240BatchTrailer {
  return {
    recordType: "5",
    bankCode: "033",
    batchNumber: line.substring(3, 7),
    filler1: line.substring(8, 17),
    recordCount: line.substring(17, 23),
    simpleInvoiceCount: line.substring(23, 29),
    simpleInvoiceAmount: line.substring(29, 46),
    filler2: line.substring(46, 240),
  };
}

export function parseFileTrailer(line: string): SantanderCnab240FileTrailer {
  return {
    recordType: "9",
    bankCode: "033",
    batchNumber: line.substring(3, 7),
    filler1: line.substring(8, 17),
    batchCount: line.substring(17, 23),
    recordCount: line.substring(23, 29),
    filler2: line.substring(29, 240),
  };
}

// ============================================================================
// Main Parsing Function
// ============================================================================

export function parseRemessa(
  lines: string[],
  layout: number,
): Cnab<SantanderCnab240RemessaRecord> {
  const entries: SantanderCnab240RemessaRecord[] = [];

  let lineIndex = 0;

  for (const line of lines) {
    if (line.length !== layout) {
      throw new LineLengthError({
        prefix,
        lineContent: line,
        lineNumber: lineIndex + 1,
      });
    }

    const recordType = line[7];
    const segmentCode = line[13];

    switch (recordType) {
      case "0":
        entries.push(parseRemessaFileHeader(line));
        break;
      case "1":
        entries.push(parseRemessaBatchHeader(line));
        break;
      case "3":
        // Detail records - check segment code
        if (segmentCode === "P") {
          entries.push(parseSegmentP(line));
        } else if (segmentCode === "Q") {
          entries.push(parseSegmentQ(line));
        } else if (segmentCode === "R") {
          entries.push(parseSegmentR(line));
        } else if (segmentCode === "S") {
          entries.push(parseSegmentS(line));
        } else if (segmentCode === "Y") {
          const identificationRegister = line.substring(17, 19);
          if (identificationRegister === "03") {
            entries.push(parseSegmentY03(line));
          } else if (identificationRegister === "53") {
            entries.push(parseSegmentY53(line));
          } else {
            throw new InvalidRecordTypeError({
              prefix,
              lineContent: line,
              lineNumber: lineIndex + 1,
              startCol: 17,
              endCol: 19,
            });
          }
        } else {
          throw new InvalidRecordTypeError({
            prefix,
            lineContent: line,
            lineNumber: lineIndex + 1,
            startCol: 13,
            endCol: 14,
          });
        }
        break;
      case "5":
        entries.push(parseBatchTrailer(line));
        break;
      case "9":
        entries.push(parseFileTrailer(line));
        break;
      default:
        throw new InvalidRecordTypeError({
          prefix,
          lineContent: line,
          lineNumber: lineIndex + 1,
          startCol: 7,
          endCol: 8,
        });
    }

    lineIndex++;
  }

  return {
    type: "REMESSA",
    layout: "240",
    entries,
  };
}

export function parseRetorno(
  lines: string[],
  layout: number,
): Cnab<SantanderCnab240RetornoRecord> {
  const entries: SantanderCnab240RetornoRecord[] = [];

  let lineIndex = 0;

  for (const line of lines.map((line) => line.padEnd(layout, " "))) {
    if (line.length !== layout) {
      throw new LineLengthError({
        prefix,
        lineContent: line,
        lineNumber: lineIndex + 1,
      });
    }

    const recordType = line[7];
    const segmentCode = line[13];

    switch (recordType) {
      case "0":
        entries.push(parseRetornoFileHeader(line));
        break;
      case "1":
        entries.push(parseRetornoBatchHeader(line));
        break;
      case "3":
        // Detail records - check segment code
        if (segmentCode === "T") {
          entries.push(parseSegmentT(line));
        } else if (segmentCode === "U") {
          entries.push(parseSegmentU(line));
        } else if (segmentCode === "Y") {
          const identificationRegister = line.substring(17, 19);
          if (identificationRegister === "03") {
            entries.push(parseSegmentY03(line));
          } else if (identificationRegister === "04") {
            entries.push(parseSegmentY04(line));
          } else {
            throw new InvalidRecordTypeError({
              prefix,
              lineContent: line,
              lineNumber: lineIndex + 1,
              startCol: 17,
              endCol: 19,
            });
          }
        } else {
          throw new InvalidRecordTypeError({
            prefix,
            lineContent: line,
            lineNumber: lineIndex + 1,
            startCol: 13,
            endCol: 14,
          });
        }
        break;
      case "5":
        entries.push(parseBatchTrailer(line));
        break;
      case "9":
        entries.push(parseFileTrailer(line));
        break;
      default:
        throw new InvalidRecordTypeError({
          prefix,
          lineContent: line,
          lineNumber: lineIndex + 1,
          startCol: 7,
          endCol: 8,
        });
    }

    lineIndex++;
  }

  return {
    type: "RETORNO",
    layout: "240",
    entries,
  };
}

export function parse(input: Buffer | string) {
  const content = Buffer.isBuffer(input) ? input.toString("utf8") : input;
  const lines = content.split(/\r?\n/).filter((line) => line.length > 0);

  const layout = lines[0].length;

  if (layout !== 240) {
    throw new UnsupportedLayoutError({ prefix });
  }

  const fileTypeCode = lines[0][142];

  if (fileTypeCode === "1") {
    return parseRemessa(lines, layout);
  } else if (fileTypeCode === "2") {
    return parseRetorno(lines, layout);
  } else {
    throw new UnsupportedLayoutError({
      prefix,
      lineNumber: 1,
      startCol: 142,
      endCol: 143,
    });
  }
}

// ============================================================================
// Generation Function
// ============================================================================

export function generate(entries: SantanderCnab240Record[]): string {
  // Helper for numeric (zero-padded, right-aligned)
  const num = (val: string | number | undefined, len: number) =>
    String(val ?? "")
      .replace(/\D/g, "")
      .padStart(len, "0")
      .slice(0, len);

  // Helper for alphanumeric (space-padded, left-aligned)
  const alpha = (val: string | undefined, len: number) =>
    (val ?? "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toUpperCase()
      .padEnd(len, " ")
      .slice(0, len);

  // Helper for dates
  const date = (val: string | undefined, len = 8) => {
    if (!val) return "".padStart(len, "0");
    if (/^\d{8}$/.test(val)) return val;
    if (/^\d{4}-\d{2}-\d{2}$/.test(val)) {
      const [y, m, d] = val.split("-");
      return `${d}${m}${y}`;
    }
    return val.padStart(len, "0").slice(0, len);
  };

  // Helper for decimal values
  const decimal = (val: string | number | undefined, len: number) => {
    const s = String(val ?? "").replace(/\D/g, "");
    return s.padStart(len, "0").slice(0, len);
  };

  let fileContent = "";

  for (const entry of entries) {
    if (entry.recordType === "0") {
      // File Header
      if ("fileTypeCode" in entry && entry.fileTypeCode === "1") {
        // Remessa
        const e = entry as SantanderCnab240RemessaFileHeader;
        fileContent +=
          num(e.bankCode, 3) +
          num(e.batchNumber, 4) +
          "0" +
          alpha(e.filler1, 8) +
          num(e.companyTaxIdTypeCode, 1) +
          num(e.companyTaxId, 15) +
          num(e.transmissionCode, 15) +
          alpha(e.filler2, 25) +
          alpha(e.companyName, 30) +
          alpha(e.bankName, 30) +
          alpha(e.filler3, 10) +
          "1" +
          date(e.creationDate, 8) +
          alpha(e.filler4, 6) +
          num(e.fileSequenceNumber, 6) +
          num(e.layoutVersion, 3) +
          alpha(e.filler5, 74);
      } else {
        // Retorno
        const e = entry as SantanderCnab240RetornoFileHeader;
        fileContent +=
          num(e.bankCode, 3) +
          num(e.batchNumber, 4) +
          "0" +
          alpha(e.filler1, 8) +
          num(e.companyTaxIdTypeCode, 1) +
          num(e.companyTaxId, 15) +
          num(e.beneficiaryBranchNumber, 4) +
          num(e.beneficiaryBranchCode, 1) +
          num(e.beneficiaryAccountNumber, 9) +
          num(e.beneficiaryAccountCode, 1) +
          alpha(e.filler2, 5) +
          num(e.beneficiaryCode, 9) +
          alpha(e.filler3, 11) +
          alpha(e.companyName, 30) +
          alpha(e.bankName, 30) +
          alpha(e.filler4, 10) +
          "2" +
          date(e.creationDate, 8) +
          alpha(e.filler5, 6) +
          num(e.fileSequenceNumber, 6) +
          num(e.layoutVersion, 3) +
          alpha(e.filler6, 74);
      }
    } else if (entry.recordType === "1") {
      // Batch Header
      if ("operationTypeCode" in entry && entry.operationTypeCode === "R") {
        // Remessa
        const e = entry as SantanderCnab240RemessaBatchHeader;
        fileContent +=
          num(e.bankCode, 3) +
          num(e.batchNumber, 4) +
          "1" +
          alpha(e.operationTypeCode, 1) +
          num(e.serviceTypeCode, 2) +
          alpha(e.filler1, 2) +
          "030" +
          alpha(e.filler2, 1) +
          num(e.companyTaxIdTypeCode, 1) +
          num(e.companyTaxId, 15) +
          alpha(e.filler3, 20) +
          num(e.transmissionCode, 15) +
          alpha(e.filler4, 5) +
          alpha(e.companyName, 30) +
          alpha(e.message1, 40) +
          alpha(e.message2, 40) +
          num(e.operationNumber, 8) +
          date(e.creationDate, 8) +
          alpha(e.filler5, 41);
      } else {
        // Retorno
        const e = entry as SantanderCnab240RetornoBatchHeader;
        fileContent +=
          num(e.bankCode, 3) +
          num(e.batchNumber, 4) +
          "1" +
          alpha(e.operationTypeCode, 1) +
          num(e.serviceTypeCode, 2) +
          alpha(e.filler1, 2) +
          num(e.batchVersion, 3) +
          alpha(e.filler2, 1) +
          num(e.companyTaxIdTypeCode, 1) +
          num(e.companyTaxId, 15) +
          num(e.beneficiaryCode, 9) +
          alpha(e.filler3, 11) +
          num(e.beneficiaryBranchNumber, 4) +
          num(e.beneficiaryBranchCode, 1) +
          num(e.beneficiaryAccountNumber, 9) +
          num(e.beneficiaryAccountCode, 1) +
          alpha(e.filler4, 5) +
          alpha(e.companyName, 30) +
          alpha(e.filler5, 80) +
          num(e.returnNumber, 8) +
          date(e.creationDate, 8) +
          alpha(e.filler6, 41);
      }
    } else if (entry.recordType === "3") {
      // Detail records
      if ("segmentCode" in entry) {
        const segmentCode = entry.segmentCode;

        if (segmentCode === "P") {
          const e = entry as SantanderCnab240SegmentP;
          fileContent +=
            num(e.bankCode, 3) +
            num(e.batchNumber, 4) +
            "3" +
            num(e.batchIndex, 5) +
            alpha("P", 1) +
            alpha(e.filler1, 1) +
            num(e.movementCode, 2) +
            num(e.branchNumber, 4) +
            num(e.branchCode, 1) +
            num(e.accountNumber, 9) +
            num(e.accountCode, 1) +
            num(e.destFIDCAccountNumber, 9) +
            num(e.destFIDCAccountCode, 1) +
            alpha(e.filler2, 2) +
            num(e.ourNumber, 13) +
            num(e.invoiceTypeCode, 1) +
            num(e.registerTypeCode, 1) +
            num(e.documentTypeCode, 1) +
            alpha(e.filler3, 1) +
            alpha(e.filler4, 1) +
            alpha(e.documentNumber, 15) +
            date(e.dueDate, 8) +
            decimal(e.amount, 15) +
            num(e.fidcBranchNumber, 4) +
            num(e.fidcBranchCode, 1) +
            alpha(e.filler5, 1) +
            num(e.speciesCode, 2) +
            alpha(e.acceptedCode, 1) +
            date(e.createdAt, 8) +
            num(e.moraTaxCode, 1) +
            date(e.moraTaxDate, 8) +
            decimal(e.moraTaxAmount, 15) +
            num(e.discountCode1, 1) +
            date(e.discountDate1, 8) +
            decimal(e.discountAmount1, 15) +
            decimal(e.iofPercentage, 15) +
            decimal(e.iofAmount, 15) +
            alpha(e.yourNumber, 25) +
            num(e.protestCode, 1) +
            num(e.protestDays, 2) +
            num(e.returnCode, 1) +
            alpha(e.filler6, 1) +
            num(e.returnDays, 2) +
            num(e.currencyCode, 2) +
            alpha(e.filler7, 11);
        } else if (segmentCode === "Q") {
          const e = entry as SantanderCnab240SegmentQ;
          fileContent +=
            num(e.bankCode, 3) +
            num(e.batchNumber, 4) +
            "3" +
            num(e.batchIndex, 5) +
            alpha("Q", 1) +
            alpha(e.filler1, 1) +
            num(e.movementCode, 2) +
            num(e.payerTaxIdTypeCode, 1) +
            num(e.payerTaxId, 15) +
            alpha(e.payerName, 40) +
            alpha(e.payerAddress, 40) +
            alpha(e.payerNeighborhood, 15) +
            num(e.payerZipcode, 5) +
            num(e.payerZipcodeSuffix, 3) +
            alpha(e.payerCity, 15) +
            alpha(e.payerState, 2) +
            num(e.beneficiaryTaxIdTypeCode, 1) +
            num(e.beneficiaryTaxId, 15) +
            alpha(e.beneficiaryName, 40) +
            num(e.filler2, 3) +
            num(e.filler3, 3) +
            num(e.filler4, 3) +
            num(e.filler5, 3) +
            alpha(e.filler6, 19);
        } else if (segmentCode === "R") {
          const e = entry as SantanderCnab240SegmentR;
          fileContent +=
            num(e.bankCode, 3) +
            num(e.batchNumber, 4) +
            "3" +
            num(e.batchIndex, 5) +
            alpha("R", 1) +
            alpha(e.filler1, 1) +
            num(e.movementCode, 2) +
            num(e.discountCode2, 1) +
            date(e.discountDate2, 8) +
            decimal(e.discountAmount2, 15) +
            alpha(e.discountCode3, 1) +
            date(e.discountDate3, 8) +
            decimal(e.discountAmount3, 15) +
            num(e.penaltyTypeCode, 1) +
            date(e.penaltyDate, 8) +
            decimal(e.penaltyAmount, 15) +
            alpha(e.filler2, 10) +
            alpha(e.message3, 40) +
            alpha(e.message4, 40) +
            alpha(e.filler3, 61);
        } else if (segmentCode === "S") {
          const e = entry as SantanderCnab240SegmentS;
          if (e.printingCode === "1") {
            fileContent +=
              num(e.bankCode, 3) +
              num(e.batchNumber, 4) +
              "3" +
              num(e.batchIndex, 5) +
              alpha("S", 1) +
              alpha(e.filler1, 1) +
              num(e.movementCode, 2) +
              num(e.printingCode, 1) +
              num(e.printingLine, 2) +
              num(e.receiptMessageCode, 1) +
              alpha(e.receiptMessage, 100) +
              alpha(e.filler2, 119);
          } else {
            fileContent +=
              num(e.bankCode, 3) +
              num(e.batchNumber, 4) +
              "3" +
              num(e.batchIndex, 5) +
              alpha("S", 1) +
              alpha(e.filler1, 1) +
              num(e.movementCode, 2) +
              num(e.printingCode, 1) +
              alpha(e.message5, 40) +
              alpha(e.message6, 40) +
              alpha(e.message7, 40) +
              alpha(e.message8, 40) +
              alpha(e.message9, 40) +
              alpha(e.filler2, 22);
          }
        } else if (segmentCode === "Y") {
          if ("identificationRegister" in entry) {
            if (entry.identificationRegister === "03") {
              const e = entry as SantanderCnab240SegmentY03;
              fileContent +=
                num(e.bankCode, 3) +
                num(e.batchNumber, 4) +
                "3" +
                num(e.batchIndex, 5) +
                alpha("Y", 1) +
                alpha(e.filler1, 1) +
                num(e.movementCode, 2) +
                num(e.identificationRegister, 2) +
                alpha(e.filler2, 62) +
                alpha(e.pixKeyType, 1) +
                alpha(e.pixKey, 77) +
                alpha(e.txid, 35) +
                alpha(e.filler3, 46);
            } else if (entry.identificationRegister === "53") {
              const e = entry as SantanderCnab240SegmentY53;
              fileContent +=
                num(e.bankCode, 3) +
                num(e.batchNumber, 4) +
                "3" +
                num(e.batchIndex, 5) +
                alpha("Y", 1) +
                alpha(e.filler1, 1) +
                num(e.movementCode, 2) +
                num(e.identificationRegister, 2) +
                num(e.paymentTypeCode, 2) +
                num(e.paymentCount, 2) +
                num(e.maxValueType, 1) +
                decimal(e.maxValue, 15) +
                num(e.minValueType, 1) +
                decimal(e.minValue, 15) +
                alpha(e.filler2, 185);
            } else if (entry.identificationRegister === "04") {
              const e = entry as SantanderCnab240SegmentY04;
              fileContent +=
                num(e.bankCode, 3) +
                num(e.batchNumber, 4) +
                "3" +
                num(e.batchIndex, 5) +
                alpha("Y", 1) +
                alpha(e.filler1, 1) +
                num(e.movementCode, 2) +
                num(e.identificationRegister, 2) +
                alpha(e.filler2, 221);
            }
          }
        } else if (segmentCode === "T") {
          const e = entry as SantanderCnab240SegmentT;
          fileContent +=
            num(e.bankCode, 3) +
            num(e.batchNumber, 4) +
            "3" +
            num(e.batchIndex, 5) +
            alpha("T", 1) +
            alpha(e.filler1, 1) +
            num(e.movementCode, 2) +
            num(e.beneficiaryBranchNumber, 4) +
            num(e.beneficiaryBranchCode, 1) +
            num(e.beneficiaryAccountNumber, 9) +
            num(e.beneficiaryAccountCode, 1) +
            alpha(e.filler2, 8) +
            num(e.ourNumber, 13) +
            num(e.portfolioCode, 1) +
            alpha(e.yourNumber, 15) +
            date(e.dueDate, 8) +
            decimal(e.amount, 15) +
            num(e.invoiceBankCode, 3) +
            num(e.invoiceBankBranchNumber, 4) +
            num(e.invoiceBankBranchCode, 1) +
            alpha(e.optionalId, 25) +
            num(e.currencyCode, 2) +
            num(e.payerTaxIdTypeCode, 1) +
            num(e.payerTaxId, 15) +
            alpha(e.payerName, 40) +
            num(e.contaCobranca, 10) +
            decimal(e.taxAmount, 15) +
            alpha(e.errorCodes, 10) +
            alpha(e.filler3, 22);
        } else if (segmentCode === "U") {
          const e = entry as SantanderCnab240SegmentU;
          fileContent +=
            num(e.bankCode, 3) +
            num(e.batchNumber, 4) +
            "3" +
            num(e.batchIndex, 5) +
            alpha("U", 1) +
            alpha(e.filler1, 1) +
            num(e.movementCode, 2) +
            decimal(e.taxAmount, 15) +
            decimal(e.discountAmount, 15) +
            decimal(e.downPaymentAmount, 15) +
            decimal(e.iofAmount, 15) +
            decimal(e.paidAmount, 15) +
            decimal(e.netAmount, 15) +
            decimal(e.otherAmount, 15) +
            decimal(e.otherCreditAmount, 15) +
            date(e.occurenceDate, 8) +
            date(e.creditDate, 8) +
            num(e.payerOccurrenceCode, 4) +
            date(e.payerOccurenceDate, 8) +
            decimal(e.payerOccurenceAmount, 15) +
            alpha(e.payerOccurenceComplement, 30) +
            num(e.correspondentBankCode, 3) +
            alpha(e.filler2, 27);
        }
      }
    } else if (entry.recordType === "5") {
      // Batch Trailer
      const e = entry as SantanderCnab240BatchTrailer;
      fileContent +=
        num(e.bankCode, 3) +
        num(e.batchNumber, 4) +
        "5" +
        alpha(e.filler1, 9) +
        num(e.recordCount, 6) +
        alpha(e.filler2, 217);
    } else if (entry.recordType === "9") {
      // File Trailer
      const e = entry as SantanderCnab240FileTrailer;
      fileContent +=
        num(e.bankCode, 3) +
        num(e.batchNumber, 4) +
        "9" +
        alpha(e.filler1, 9) +
        num(e.batchCount, 6) +
        num(e.recordCount, 6) +
        alpha(e.filler2, 211);
    }

    fileContent += "\r\n";
  }

  return fileContent;
}

/**
 * Calcula o DAC do "Nosso Número" usando Módulo 11
 * Conforme Nota 15 da especificação
 */
export function calculateDacNossoNumero(nossoNumero: string): string {
  const multiplicadores = [2, 3, 4, 5, 6, 7, 8, 9];
  let soma = 0;

  // Multiplicar da direita para a esquerda
  for (let i = nossoNumero.length - 1; i >= 0; i--) {
    const digito = parseInt(nossoNumero[i]);
    const multiplicador = multiplicadores[(nossoNumero.length - 1 - i) % 8];
    soma += digito * multiplicador;
  }

  const resto = soma % 11;
  let dac = 11 - resto;

  // Exceções: Se o resto for 0 ou 1, o DAC será 0
  // Se o resto for 10, o DAC será 1
  if (resto === 0 || resto === 1) {
    dac = 0;
  } else if (resto === 10) {
    dac = 1;
  }

  return dac.toString();
}
