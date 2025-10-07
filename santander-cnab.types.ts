import {
  CnabDetailPartial,
  CnabRemessaBatchHeader,
  CnabRemessaFileHeader,
  CnabRetornoBatchHeader,
  CnabRetornoFileHeader,
} from '@/lib/cnab-lib';

export type SantanderCnab240RemessaFileHeader = CnabRemessaFileHeader & {
  bankCode: '033';
  batchNumber: string;
  entryTypeCode: '0';
  filler1: string;
  companyTaxIdTypeCode: string;
  companyTaxId: string;
  transmissionCode: string;
  filler2: string;
  companyName: string;
  bankName: string;
  filler3: string;
  fileTypeCode: '1';
  creationDate: string;
  filler4: string;
  fileSequenceNumber: string;
  layoutVersion: '040';
  filler5: string;
};

export type SantanderCnab240RetornoFileHeader = CnabRetornoFileHeader & {
  bankCode: '033';
  batchNumber: string;
  entryTypeCode: '0';
  filler1: string;
  companyTaxIdTypeCode: string;
  companyTaxId: string;
  beneficiaryBranchNumber: string;
  beneficiaryBranchCode: string;
  beneficiaryAccountNumber: string;
  beneficiaryAccountCode: string;
  filler2: string;
  beneficiaryCode: string;
  filler3: string;
  companyName: string;
  bankName: string;
  filler4: string;
  fileTypeCode: '2';
  creationDate: string;
  filler5: string;
  fileSequenceNumber: string;
  layoutVersion: '040';
  filler6: string;
};

export type SantanderCnab240FileHeader =
  | SantanderCnab240RemessaFileHeader
  | SantanderCnab240RetornoFileHeader;

export type SantanderCnab240RemessaBatchHeader = CnabRemessaBatchHeader & {
  bankCode: '033';
  batchNumber: string;
  entryTypeCode: '1';
  operationTypeCode: 'R';
  serviceTypeCode: string;
  filler1: string;
  batchVersion: string;
  filler2: string;
  companyTaxIdTypeCode: string;
  companyTaxId: string;
  filler3: string;
  transmissionCode: string;
  filler4: string;
  companyName: string;
  message1: string;
  message2: string;
  operationNumber: string;
  creationDate: string;
  filler5: string;
};

export type SantanderCnab240RetornoBatchHeader = CnabRetornoBatchHeader & {
  bankCode: '033';
  batchNumber: string;
  entryTypeCode: '1';
  operationTypeCode: 'T';
  serviceTypeCode: string;
  filler1: string;
  batchVersion: string;
  filler2: string;
  companyTaxIdTypeCode: string;
  companyTaxId: string;
  beneficiaryCode: string;
  filler3: string;
  beneficiaryBranchNumber: string;
  beneficiaryBranchCode: string;
  beneficiaryAccountNumber: string;
  beneficiaryAccountCode: string;
  filler4: string;
  companyName: string;
  filler5: string;
  returnNumber: string;
  creationDate: string;
  filler6: string;
};

export type SantanderCnab240BatchHeader =
  | SantanderCnab240RemessaBatchHeader
  | SantanderCnab240RetornoBatchHeader;

export type SantanderCnab240SegmentP = CnabDetailPartial & {
  bankCode: '033';
  batchNumber: string;
  entryTypeCode: '3';
  batchIndex: string;
  segmentCode: 'P';
  filler1: string;
  movementCode: string;
  branchNumber: string;
  branchCode: string;
  accountNumber: string;
  accountCode: string;
  destFIDCAccountNumber: string;
  destFIDCAccountCode: string;
  filler2: string;
  ourNumber: string;
  yourNumber: string;
  invoiceTypeCode: string;
  registerTypeCode: string;
  documentTypeCode: string;
  filler3: string;
  filler4: string;
  documentNumber: string;
  dueDate: string;
  amount: string;
  fidcBranchNumber: string;
  fidcBranchCode: string;
  filler5: string;
  speciesCode: string;
  acceptedCode: string;
  createdAt: string;
  moraTaxCode: string;
  moraTaxDate: string;
  moraTaxAmount: string;
  discountCode1: string;
  discountDate1: string;
  discountAmount1: string;
  iofPercentage: string;
  iofAmount: string;
  protestCode: string;
  protestDays: string;
  returnCode: string;
  filler6: string;
  returnDays: string;
  currencyCode: string;
  filler7: string;
};

export type SantanderCnab240SegmentQ = CnabDetailPartial & {
  bankCode: '033';
  batchNumber: string;
  entryTypeCode: '3';
  batchIndex: string;
  segmentCode: 'Q';
  filler1: string;
  movementCode: string;
  payerTaxIdTypeCode: string;
  payerTaxId: string;
  payerName: string;
  payerAddress: string;
  payerNeighborhood: string;
  payerZipcode: string;
  payerZipcodeSuffix: string;
  payerCity: string;
  payerState: string;
  beneficiaryTaxIdTypeCode: string;
  beneficiaryTaxId: string;
  beneficiaryName: string;
  filler2: string;
  filler3: string;
  filler4: string;
  filler5: string;
  filler6: string;
};

export type SantanderCnab240SegmentR = CnabDetailPartial & {
  bankCode: '033';
  batchNumber: string;
  entryTypeCode: '3';
  batchIndex: string;
  segmentCode: 'R';
  filler1: string;
  movementCode: string;
  discountCode2: string;
  discountDate2: string;
  discountAmount2: string;
  discountCode3: string;
  discountDate3: string;
  discountAmount3: string;
  penaltyTypeCode: string;
  penaltyDate: string;
  penaltyAmount: string;
  filler2: string;
  message3: string;
  message4: string;
  filler3: string;
};

export type SantanderCnab240SegmentS = CnabDetailPartial & {
  bankCode: '033';
  batchNumber: string;
  entryTypeCode: '3';
  batchIndex: string;
  segmentCode: 'S';
  filler1: string;
  movementCode: string;
} & (
    | {
        printingCode: '1';
        printingLine: string;
        receiptMessageCode: string;
        receiptMessage: string;
        filler2: string;
      }
    | {
        printingCode: '2';
        message5: string;
        message6: string;
        message7: string;
        message8: string;
        message9: string;
        filler2: string;
      }
  );

export type SantanderCnab240SegmentT = CnabDetailPartial & {
  bankCode: '033';
  batchNumber: string;
  entryTypeCode: '3';
  batchIndex: string;
  segmentCode: 'T';
  filler1: string;
  movementCode: string;
  beneficiaryBranchNumber: string;
  beneficiaryBranchCode: string;
  beneficiaryAccountNumber: string;
  beneficiaryAccountCode: string;
  filler2: string;
  ourNumber: string;
  portfolioCode: string;
  yourNumber: string;
  dueDate: string;
  amount: string;
  invoiceBankCode: string;
  invoiceBankBranchNumber: string;
  invoiceBankBranchCode: string;
  optionalId: string;
  currencyCode: string;
  payerTaxIdTypeCode: string;
  payerTaxIdType: 'CPF' | 'CNPJ';
  payerTaxId: string;
  payerName: string;
  contaCobranca: string;
  taxAmount: string;
  errorCodes: string;
  filler3: string;
};

export type SantanderCnab240SegmentU = CnabDetailPartial & {
  bankCode: '033';
  batchNumber: string;
  entryTypeCode: '3';
  batchIndex: string;
  segmentCode: 'U';
  filler1: string;
  movementCode: string;
  taxAmount: string;
  discountAmount: string;
  downPaymentAmount: string;
  iofAmount: string;
  paidAmount: string;
  netAmount: string;
  otherAmount: string;
  otherCreditAmount: string;
  occurenceDate: string;
  creditDate: string;
  payerOccurrenceCode: string;
  payerOccurenceDate: string;
  payerOccurenceAmount: string;
  payerOccurenceComplement: string;
  correspondentBankCode: string;
  filler2: string;
};

export type SantanderCnab240Detail =
  | SantanderCnab240SegmentP
  | SantanderCnab240SegmentQ
  | SantanderCnab240SegmentR
  | SantanderCnab240SegmentS
  | SantanderCnab240SegmentT
  | SantanderCnab240SegmentU;
