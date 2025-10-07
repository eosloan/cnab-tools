import { BadRequestException, Injectable } from '@nestjs/common';
import { Readable } from 'stream';
import * as readline from 'readline';
import {
  CnabEntryType,
  CnabParser,
  CnabRemessa,
  CnabRetorno,
} from '@/lib/cnab-lib';
import { differenceInDays } from 'date-fns';
import { TZDateMini } from '@date-fns/tz';
import {
  SantanderCnab240Detail,
  SantanderCnab240RemessaBatchHeader,
  SantanderCnab240RemessaFileHeader,
  SantanderCnab240RetornoBatchHeader,
  SantanderCnab240RetornoFileHeader,
  SantanderCnab240SegmentP,
  SantanderCnab240SegmentQ,
  SantanderCnab240SegmentR,
  SantanderCnab240SegmentS,
  SantanderCnab240SegmentT,
  SantanderCnab240SegmentU,
} from './santander-cnab.types';

@Injectable()
export class SantanderCnab implements CnabParser {
  static readonly bankCode = '033';

  fileType: 'REMESSA' | 'RETORNO' | undefined;
  version: 'CNAB_240' | undefined;

  currencyCodeToTypeableLineCurrencyCode = {
    '00': '9',
  };

  invoiceTypeCodeToTypeableLineInvoiceTypeCode = {
    '1': '104',
    '3': '104',
    '4': '104',
    '5': '101',
    '6': '101',
    '7': '101',
    '8': '104',
    '9': '101',
  };

  parseRemessaFileHeader(line: string): SantanderCnab240RemessaFileHeader {
    // Cnab 240 Santander V8.2 08/2024

    const bankCode = line.substring(0, 3);
    const entryTypeCode = line[7];
    const fileTypeCode = line[142];
    const layoutVersion = line.substring(163, 166);

    if (layoutVersion !== '040') {
      throw new BadRequestException('O versão do layout não é válida');
    }

    if (bankCode !== '033' || entryTypeCode !== '0' || fileTypeCode !== '1') {
      throw new BadRequestException('O arquivo não é um CNAB 240 válido');
    }

    return {
      fileType: 'REMESSA',
      entryType: 'FILE_HEADER',
      bankCode,
      batchNumber: line.substring(3, 7),
      entryTypeCode,
      filler1: line.substring(8, 16),
      companyTaxIdTypeCode: line[16],
      companyTaxId: line.substring(17, 32),
      transmissionCode: line.substring(32, 47),
      filler2: line.substring(47, 72),
      companyName: line.substring(72, 102),
      bankName: line.substring(102, 132),
      filler3: line.substring(132, 142),
      fileTypeCode,
      creationDate: line.substring(143, 151),
      filler4: line.substring(151, 157),
      fileSequenceNumber: line.substring(157, 163),
      layoutVersion,
      filler5: line.substring(166, 240),
    } as const;
  }

  parseRetornoFileHeader(line: string): SantanderCnab240RetornoFileHeader {
    // Cnab 240 Santander V8.2 08/2024

    const bankCode = line.substring(0, 3);
    const entryTypeCode = line[7];
    const fileTypeCode = line[142];
    const layoutVersion = line.substring(163, 166);

    if (layoutVersion !== '040') {
      throw new BadRequestException('O versão do layout não é válida');
    }

    if (bankCode !== '033' || entryTypeCode !== '0' || fileTypeCode !== '2') {
      throw new BadRequestException('O arquivo não é um CNAB 240 válido');
    }

    return {
      fileType: 'RETORNO',
      entryType: 'FILE_HEADER',
      bankCode,
      batchNumber: line.substring(3, 7),
      entryTypeCode,
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
      companyName: line.substring(72, 102),
      bankName: line.substring(102, 132),
      filler4: line.substring(132, 142),
      fileTypeCode,
      creationDate: line.substring(143, 151),
      filler5: line.substring(151, 157),
      fileSequenceNumber: line.substring(157, 163),
      layoutVersion,
      filler6: line.substring(166, 240),
    } as const;
  }

  parseRemessaBatchHeader(line: string): SantanderCnab240RemessaBatchHeader {
    // Cnab 240 Santander V8.2 08/2024

    const bankCode = line.substring(0, 3);
    const entryTypeCode = line[7];
    const operationTypeCode = line[8];

    if (
      bankCode !== '033' ||
      entryTypeCode !== '1' ||
      operationTypeCode !== 'R'
    ) {
      throw new BadRequestException('O arquivo não é um CNAB 240 válido');
    }

    return {
      fileType: 'REMESSA',
      entryType: 'BATCH_HEADER',
      bankCode,
      batchNumber: line.substring(3, 7),
      entryTypeCode,
      operationTypeCode,
      serviceTypeCode: line.substring(9, 11),
      filler1: line.substring(11, 13),
      batchVersion: line.substring(13, 16),
      filler2: line[16],
      companyTaxIdTypeCode: line[17],
      companyTaxId: line.substring(18, 33),
      filler3: line.substring(33, 53),
      transmissionCode: line.substring(53, 68),
      filler4: line.substring(68, 73),
      companyName: line.substring(73, 103),
      message1: line.substring(103, 143),
      message2: line.substring(143, 183),
      operationNumber: line.substring(183, 191),
      creationDate: line.substring(191, 199),
      filler5: line.substring(199, 240),
    } as const;
  }

  parseRetornoBatchHeader(line: string): SantanderCnab240RetornoBatchHeader {
    // Cnab 240 Santander V8.2 08/2024

    const bankCode = line.substring(0, 3);
    const entryTypeCode = line[7];
    const operationTypeCode = line[8];

    if (
      bankCode !== '033' ||
      entryTypeCode !== '1' ||
      operationTypeCode !== 'T'
    ) {
      throw new BadRequestException('O arquivo não é um CNAB 240 válido');
    }

    return {
      fileType: 'RETORNO',
      entryType: 'BATCH_HEADER',
      bankCode,
      batchNumber: line.substring(3, 7),
      entryTypeCode,
      operationTypeCode,
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
      companyName: line.substring(73, 103),
      filler5: line.substring(103, 183),
      returnNumber: line.substring(183, 191),
      creationDate: line.substring(191, 199),
      filler6: line.substring(199, 240),
    } as const;
  }

  parseSegmentP(line: string): SantanderCnab240SegmentP {
    // Cnab 240 Santander V8.2 08/2024

    const bankCode = line.substring(0, 3);
    const entryTypeCode = line[7];

    if (bankCode !== '033' || entryTypeCode !== '3') {
      throw new BadRequestException('O arquivo não é um CNAB 240 válido');
    }

    return {
      entryType: 'DETAIL',
      partial: true,
      bankCode,
      batchNumber: line.substring(3, 7),
      entryTypeCode,
      batchIndex: line.substring(8, 13),
      segmentCode: 'P',
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
      fidcBranchCode: line.substring(104, 105),
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
      yourNumber: line.substring(195, 220),
      protestCode: line[220],
      protestDays: line.substring(221, 223),
      returnCode: line[223],
      filler6: line[224],
      returnDays: line.substring(225, 227),
      currencyCode: line.substring(227, 229),
      filler7: line.substring(229, 240),
    } as const;
  }

  parseSegmentQ(line: string): SantanderCnab240SegmentQ {
    // Cnab 240 Santander V8.2 08/2024
    const bankCode = line.substring(0, 3);
    const entryTypeCode = line[7];

    if (bankCode !== '033' || entryTypeCode !== '3') {
      throw new BadRequestException('O arquivo não é um CNAB 240 válido');
    }

    return {
      entryType: 'DETAIL',
      partial: true,
      bankCode,
      batchNumber: line.substring(3, 7),
      entryTypeCode,
      batchIndex: line.substring(8, 13),
      segmentCode: 'Q',
      filler1: line[14],
      movementCode: line.substring(15, 17),
      payerTaxIdTypeCode: line[17],
      payerTaxId: line.substring(18, 33),
      payerName: line.substring(34, 73),
      payerAddress: line.substring(73, 113),
      payerNeighborhood: line.substring(113, 128),
      payerZipcode: line.substring(128, 133),
      payerZipcodeSuffix: line.substring(133, 136),
      payerCity: line.substring(136, 151),
      payerState: line.substring(151, 153),
      beneficiaryTaxIdTypeCode: line[153],
      beneficiaryTaxId: line.substring(154, 169),
      beneficiaryName: line.substring(169, 209),
      filler2: line.substring(209, 212),
      filler3: line.substring(212, 215),
      filler4: line.substring(215, 218),
      filler5: line.substring(218, 221),
      filler6: line.substring(222, 240),
    } as const;
  }

  parseSegmentR(line: string): SantanderCnab240SegmentR {
    // Cnab 240 Santander V8.2 08/2024
    const bankCode = line.substring(0, 3);
    const entryTypeCode = line[7];

    if (bankCode !== '033' || entryTypeCode !== '3') {
      throw new BadRequestException('O arquivo não é um CNAB 240 válido');
    }
    return {
      entryType: 'DETAIL',
      partial: true,
      bankCode,
      batchNumber: line.substring(3, 7),
      entryTypeCode,
      batchIndex: line.substring(8, 13),
      segmentCode: 'R',
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
      message3: line.substring(99, 139),
      message4: line.substring(139, 179),
      filler3: line.substring(179, 240),
    } as const;
  }

  parseSegmentS(line: string): SantanderCnab240SegmentS {
    // Cnab 240 Santander V8.2 08/2024
    const bankCode = line.substring(0, 3);
    const entryTypeCode = line[7];

    if (bankCode !== '033' || entryTypeCode !== '3') {
      throw new BadRequestException('O arquivo não é um CNAB 240 válido');
    }

    const common = {
      entryType: 'DETAIL',
      partial: true,
      bankCode,
      batchNumber: line.substring(3, 7),
      entryTypeCode,
      batchIndex: line.substring(8, 13),
      segmentCode: 'S',
      filler1: line[14],
      movementCode: line.substring(15, 17),
    } as const;

    if (line[17] === '1') {
      return {
        ...common,
        printingCode: '1',
        printingLine: line.substring(18, 20),
        receiptMessageCode: line[20],
        receiptMessage: line.substring(21, 121),
        filler2: line.substring(121, 240),
      } as const;
    } else if (line[17] === '2') {
      return {
        ...common,
        printingCode: '2',
        message5: line.substring(18, 58),
        message6: line.substring(58, 98),
        message7: line.substring(98, 138),
        message8: line.substring(138, 178),
        message9: line.substring(178, 218),
        filler2: line.substring(218, 240),
      } as const;
    } else {
      throw new Error('Invalid print code');
    }
  }

  parseSegmentT(line: string): SantanderCnab240SegmentT {
    // Cnab 240 Santander V8.2 08/2024
    const bankCode = line.substring(0, 3);
    const entryTypeCode = line[7];

    if (bankCode !== '033' || entryTypeCode !== '3') {
      throw new BadRequestException('O arquivo não é um CNAB 240 válido');
    }
    return {
      entryType: 'DETAIL',
      partial: true,
      bankCode,
      batchNumber: line.substring(3, 7),
      entryTypeCode,
      batchIndex: line.substring(8, 13),
      segmentCode: 'T',
      filler1: line[14],
      movementCode: line.substring(15, 17),
      beneficiaryBranchNumber: line.substring(17, 21),
      beneficiaryBranchCode: line[21],
      beneficiaryAccountNumber: line.substring(22, 31),
      beneficiaryAccountCode: line[31],
      filler2: line.substring(32, 40),
      ourNumber: line.substring(40, 53),
      portfolioCode: line[53],
      yourNumber: line.substring(54, 69),
      dueDate: line.substring(69, 77),
      amount: line.substring(77, 92),
      invoiceBankCode: line.substring(92, 95),
      invoiceBankBranchNumber: line.substring(95, 99),
      invoiceBankBranchCode: line[99],
      optionalId: line.substring(100, 125),
      currencyCode: line.substring(125, 127),
      payerTaxIdTypeCode: line[127],
      payerTaxIdType: line[127] === '1' ? 'CPF' : 'CNPJ',
      payerTaxId: line.substring(128, 143),
      payerName: line.substring(143, 183),
      contaCobranca: line.substring(183, 193),
      taxAmount: line.substring(193, 208),
      errorCodes: line.substring(208, 218),
      filler3: line.substring(218, 240),
    } as const;
  }

  parseSegmentU(line: string): SantanderCnab240SegmentU {
    // Cnab 240 Santander V8.2 08/2024
    const bankCode = line.substring(0, 3);
    const entryTypeCode = line[7];

    if (bankCode !== '033' || entryTypeCode !== '3') {
      throw new BadRequestException('O arquivo não é um CNAB 240 válido');
    }

    return {
      entryType: 'DETAIL',
      partial: true,
      bankCode,
      batchNumber: line.substring(3, 7),
      entryTypeCode,
      batchIndex: line.substring(8, 13),
      segmentCode: 'U',
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
      payerOccurenceComplement: line.substring(180, 210),
      correspondentBankCode: line.substring(210, 213),
      filler2: line.substring(213, 240),
    } as const;
  }

  parseDetail(line: string) {
    // Cnab 240 Santander V8.2 08/2024
    switch (line[13]) {
      case 'P':
        return this.parseSegmentP(line);
      case 'Q':
        return this.parseSegmentQ(line);
      case 'R':
        return this.parseSegmentR(line);
      case 'S':
        return this.parseSegmentS(line);
      case 'T':
        return this.parseSegmentT(line);
      case 'U':
        return this.parseSegmentU(line);
      default:
        throw new Error('Invalid segment code');
    }
  }

  processLineRemessa(line: string) {
    switch (line[7]) {
      case '0':
        return this.parseRemessaFileHeader(line);
      case '1':
        return this.parseRemessaBatchHeader(line);
      case '3':
        return this.parseDetail(line);
      case '5':
        break;
      case '9':
        break;
    }
  }

  processLineRetorno(line: string) {
    switch (line[7]) {
      case '0':
        return this.parseRetornoFileHeader(line);
      case '1':
        return this.parseRetornoBatchHeader(line);
      case '3':
        return this.parseDetail(line);
      case '5':
        break;
      case '9':
        break;
    }
  }

  async parseCnab(file: Readable): Promise<CnabEntryType[]> {
    const rl = readline.createInterface({
      input: file,
      crlfDelay: Infinity,
    });

    const entries: CnabEntryType[] = [];

    for await (const line of rl) {
      if (line.length === 240) {
        this.version = 'CNAB_240';
      } else {
        // We must have to deal with it.
        // Now it just bypass if the CNAB do have 240 of line length or not
        continue;
      }

      if (line[7] === '0') {
        this.fileType = line[142] === '1' ? 'REMESSA' : 'RETORNO';
      }

      if (!this.fileType) {
        throw new Error('File type not found');
      }

      if (this.fileType === 'REMESSA') {
        const entry = this.processLineRemessa(line);
        if (entry) {
          entries.push(entry);
        }
      } else if (this.fileType === 'RETORNO') {
        const entry = this.processLineRetorno(line);
        if (entry) {
          entries.push(entry);
        }
      } else {
        throw new Error('Invalid file type');
      }
    }

    return entries;
  }

  parseRetorno(entries: CnabEntryType[]): CnabRetorno[] {
    const retornos: CnabRetorno[] = [];

    let currentEntry = {} as CnabRetorno;

    for (const entry of entries) {
      if (entry.entryType === 'DETAIL') {
        const detail = entry as SantanderCnab240Detail;

        if (detail.segmentCode === 'T') {
          if (Object.keys(currentEntry).length > 0) {
            retornos.push(currentEntry);
          }
          currentEntry = {} as CnabRetorno;
        }

        if (detail.segmentCode === 'T') {
          currentEntry.payerTaxIdType = detail.payerTaxIdType;
          currentEntry.payerTaxId = detail.payerTaxId;
          currentEntry.operationType =
            ({ '06': 'PAID', '09': 'CANCELED' } as const)[
              detail.movementCode
            ] || 'UNKNOWN';
          currentEntry.dueDate = detail.dueDate;
        }

        if (detail.segmentCode === 'U') {
          currentEntry.occuranceDate = detail.occurenceDate;
        }
      }
    }

    if (Object.keys(currentEntry).length > 0) {
      retornos.push(currentEntry);
    }

    return retornos;
  }

  parseRemessa(entries: CnabEntryType[]): CnabRemessa[] {
    const remessas: CnabRemessa[] = [];

    let currentEntry = {} as CnabRemessa;

    let transmissionCode = '';

    for (const entry of entries) {
      const detail = entry as SantanderCnab240Detail;

      if (entry.entryType === 'FILE_HEADER') {
        transmissionCode = (entry as SantanderCnab240RemessaFileHeader)
          .transmissionCode;
      }

      if (detail.segmentCode === 'P') {
        if (Object.keys(currentEntry).length > 0) {
          remessas.push(currentEntry);
        }
        currentEntry = {} as CnabRemessa;
      }

      if (detail.segmentCode === 'P') {
        currentEntry.amount = detail.amount;
        currentEntry.dueDate = detail.dueDate;
        currentEntry.ourNumber = detail.ourNumber;
        currentEntry.yourNumber = detail.yourNumber;
        currentEntry.invoiceTypeCode = detail.invoiceTypeCode;
        currentEntry.currencyCode = detail.currencyCode;
        currentEntry.bankCode = detail.bankCode;
        currentEntry.transmissionCode = transmissionCode;
        currentEntry.moraTaxCode =
          ({ '1': 'FIXED_DAILY', '2': 'PERCENTAGE_MONTHLY' } as const)[
            detail.moraTaxCode
          ] || '';
        currentEntry.moraTaxAmount = detail.moraTaxAmount || '';
        currentEntry.moraTaxDate = detail.moraTaxDate || '';
      } else if (detail.segmentCode === 'Q') {
        currentEntry.payerTaxIdType =
          detail.payerTaxIdTypeCode === '1' ? 'CPF' : 'CNPJ';
        currentEntry.payerTaxId = detail.payerTaxId;
        currentEntry.payerName = detail.payerName;
      } else if (detail.segmentCode === 'R') {
        currentEntry.penaltyCode =
          ({ '1': 'FIXED', '2': 'PERCENTAGE' } as const)[
            detail.penaltyTypeCode
          ] || '';
        currentEntry.penaltyDate = detail.penaltyDate || '';
        currentEntry.penaltyAmount = detail.penaltyAmount || '';
      }
    }

    if (Object.keys(currentEntry).length > 0) {
      remessas.push(currentEntry);
    }

    return remessas;
  }

  dv10(str: string) {
    let sum = 0;

    for (let i = 0; i < str.length; i++) {
      const presum =
        parseInt(str.charAt(str.length - i - 1)) * (i % 2 === 0 ? 2 : 1);
      if (presum >= 10) {
        sum += String(presum)
          .split('')
          .reduce((acc, digit) => acc + parseInt(digit), 0);
      } else {
        sum += presum;
      }
    }

    const mod = sum % 10;

    return mod === 0 ? 0 : 10 - mod;
  }

  dv11(str: string) {
    const weights = [2, 3, 4, 5, 6, 7, 8, 9];
    let sum = 0;

    for (let i = 0; i < str.length; i++) {
      sum +=
        parseInt(str.charAt(str.length - i - 1)) * weights[i % weights.length];
    }

    sum *= 10;

    const mod = sum % 11;

    return mod === 0 || mod === 1 || mod === 10 ? 1 : mod;
  }

  dueFactor(dueDate: Date) {
    const range = 9999 - 1000 + 1;
    const diff =
      differenceInDays(
        new TZDateMini(dueDate, 'UTC'),
        new TZDateMini(new Date(1997, 9, 7), 'UTC'),
      ) + 1;
    return ((((diff - 1000) % range) + range) % range) + 1000;
  }

  parseBarcode(remessa: CnabRemessa): string {
    const currencyCode =
      this.currencyCodeToTypeableLineCurrencyCode[remessa.currencyCode] || 'X';
    const firstGroup = `${remessa.bankCode}${currencyCode}`;

    let dueDate = remessa.dueDate;
    dueDate = dueDate.replace(
      /([0-9]{2})([0-9]{2})([0-9]{4})/,
      (_, day, month, year) => {
        return `${year}-${month}-${day}`;
      },
    );
    const invoiceTypeCode =
      this.invoiceTypeCodeToTypeableLineInvoiceTypeCode[
        remessa.invoiceTypeCode
      ] || 'XXX';
    const secondGroup = `${this.dueFactor(new Date(dueDate))}${remessa.amount.slice(
      -10,
    )}9${remessa.transmissionCode.slice(-7)}${remessa.ourNumber.slice(-13)}0${invoiceTypeCode}`;

    const dv = this.dv11(`${firstGroup}${secondGroup}`);

    return `${firstGroup}${dv}${secondGroup}`;
  }

  parseTypeableLine(remessa: CnabRemessa): string {
    const beneficiaryCode = remessa.transmissionCode.slice(-7);

    const currencyCode =
      this.currencyCodeToTypeableLineCurrencyCode[remessa.currencyCode] || 'X';
    let firstGroup = `${remessa.bankCode}9${currencyCode}${beneficiaryCode.slice(0, 4)}`;
    firstGroup += this.dv10(firstGroup);

    let secondGroup = `${beneficiaryCode.slice(4, 7)}${remessa.ourNumber.slice(0, 7)}`;
    secondGroup += this.dv10(secondGroup);

    const invoiceTypeCode =
      this.invoiceTypeCodeToTypeableLineInvoiceTypeCode[
        remessa.invoiceTypeCode
      ] || 'XXX';
    let thirdGroup = `${remessa.ourNumber.slice(7)}0${invoiceTypeCode}`;
    thirdGroup += this.dv10(thirdGroup);

    const fourthGroup = this.parseBarcode(remessa)[4];

    let dueDate = remessa.dueDate;
    dueDate = dueDate.replace(
      /([0-9]{2})([0-9]{2})([0-9]{4})/,
      (_, day, month, year) => {
        return `${year}-${month}-${day}`;
      },
    );
    const fifthGroup = `${this.dueFactor(new Date(dueDate))}${remessa.amount.slice(-10)}`;

    return `${firstGroup}${secondGroup}${thirdGroup}${fourthGroup}${fifthGroup}`;
  }

  generate(entries: CnabEntryType[]): string {
    // --- Helpers ---
    const num = (val: string | number | undefined, len: number) =>
      String(val ?? '')
        .replace(/\D/g, '')
        .padStart(len, '0')
        .slice(0, len);
    const alpha = (val: string | undefined, len: number) =>
      (val ?? '')
        .normalize('NFD')
        .replace(/[^\w\s]/g, '')
        .toUpperCase()
        .padEnd(len, ' ')
        .slice(0, len);
    const date = (val: string | undefined, len = 8) => {
      // Accepts DDMMAAAA or AAAAMMDD, returns DDMMAAAA
      if (!val) return ''.padEnd(len, '0');
      if (/^\d{8}$/.test(val)) return val;
      if (/^\d{4}-\d{2}-\d{2}$/.test(val)) {
        const [y, m, d] = val.split('-');
        return `${d}${m}${y}`;
      }
      return val.padStart(len, '0').slice(0, len);
    };
    const decimal = (val: string | number | undefined, len: number) => {
      // Remove any separator, pad left
      const s = String(val ?? '').replace(/\D/g, '');
      return s.padStart(len, '0').slice(0, len);
    };

    const lines: string[] = [];
    let batchNumber = '0001';
    let batchRecordSeq = 1;

    for (const entry of entries) {
      if (entry.entryType === 'FILE_HEADER') {
        // File Header (type 0)
        const e = entry as any;
        lines.push(
          num(e.bankCode, 3) +
            num('0000', 4) +
            num('0', 1) +
            alpha('', 8) +
            num(e.companyTaxIdTypeCode, 1) +
            num(e.companyTaxId, 15) +
            num(e.transmissionCode, 15) +
            alpha('', 25) +
            alpha(e.companyName, 30) +
            alpha(e.bankName, 30) +
            alpha('', 10) +
            num('1', 1) +
            date(e.creationDate, 8) +
            alpha('', 6) +
            num(e.fileSequenceNumber, 6) +
            num('040', 3) +
            alpha('', 74),
        );
        batchRecordSeq = 1;
      } else if (entry.entryType === 'BATCH_HEADER') {
        // Batch Header (type 1)
        const e = entry as any;
        batchNumber = num(e.batchNumber || '1', 4);
        lines.push(
          num(e.bankCode, 3) +
            batchNumber +
            num('1', 1) +
            alpha('R', 1) +
            num(e.serviceTypeCode, 2) +
            alpha('', 2) +
            num('030', 3) +
            alpha('', 1) +
            num(e.companyTaxIdTypeCode, 1) +
            num(e.companyTaxId, 15) +
            alpha('', 20) +
            num(e.transmissionCode, 15) +
            alpha('', 5) +
            alpha(e.companyName, 30) +
            alpha(e.message1, 40) +
            alpha(e.message2, 40) +
            num(e.operationNumber, 8) +
            date(e.creationDate, 8) +
            alpha('', 41),
        );
        batchRecordSeq = 1;
      } else if (entry.entryType === 'DETAIL') {
        // Detail (type 3, segments)
        const d = entry as any;
        // Segment P
        if (d.segmentCode === 'P') {
          lines.push(
            num(d.bankCode, 3) +
              batchNumber +
              num('3', 1) +
              num(batchRecordSeq, 5) +
              alpha('P', 1) +
              alpha(d.filler1, 1) +
              num(d.movementCode, 2) +
              num(d.branchNumber, 4) +
              num(d.branchCode, 1) +
              num(d.accountNumber, 9) +
              num(d.accountCode, 1) +
              num(d.destFIDCAccountNumber, 9) +
              num(d.destFIDCAccountCode, 1) +
              alpha(d.filler2, 2) +
              num(d.ourNumber, 13) +
              alpha(d.invoiceTypeCode, 1) +
              alpha(d.registerTypeCode, 1) +
              alpha(d.documentTypeCode, 1) +
              alpha(d.filler3, 1) +
              alpha(d.filler4, 1) +
              alpha(d.documentNumber, 15) +
              date(d.dueDate, 8) +
              decimal(d.amount, 15) +
              num(d.fidcBranchNumber, 4) +
              num(d.fidcBranchCode, 1) +
              alpha(d.filler5, 1) +
              num(d.speciesCode, 2) +
              alpha(d.acceptedCode, 1) +
              date(d.createdAt, 8) +
              num(d.moraTaxCode, 1) +
              date(d.moraTaxDate, 8) +
              decimal(d.moraTaxAmount, 15) +
              num(d.discountCode1, 1) +
              date(d.discountDate1, 8) +
              decimal(d.discountAmount1, 15) +
              decimal(d.iofPercentage, 15) +
              decimal(d.iofAmount, 15) +
              alpha(d.optionalId, 25) +
              num(d.protestCode, 1) +
              num(d.protestDays, 2) +
              num(d.returnCode, 1) +
              alpha(d.filler6, 1) +
              num(d.returnDays, 2) +
              num(d.currencyCode, 2) +
              alpha(d.filler7, 11),
          );
          batchRecordSeq++;
        } else if (d.segmentCode === 'Q') {
          lines.push(
            num(d.bankCode, 3) +
              batchNumber +
              num('3', 1) +
              num(batchRecordSeq, 5) +
              alpha('Q', 1) +
              alpha(d.filler1, 1) +
              num(d.movementCode, 2) +
              num(d.payerTaxIdTypeCode, 1) +
              num(d.payerTaxId, 15) +
              alpha(d.payerName, 40) +
              alpha(d.payerAddress, 40) +
              alpha(d.payerNeighborhood, 15) +
              num(d.payerZipcode, 5) +
              num(d.payerZipcodeSuffix, 3) +
              alpha(d.payerCity, 15) +
              alpha(d.payerState, 2) +
              num(d.beneficiaryTaxIdTypeCode, 1) +
              num(d.beneficiaryTaxId, 15) +
              alpha(d.beneficiaryName, 40) +
              num(d.filler2, 3) +
              num(d.filler3, 3) +
              num(d.filler4, 3) +
              num(d.filler5, 3) +
              alpha(d.filler6, 19),
          );
          batchRecordSeq++;
        } else if (d.segmentCode === 'R') {
          lines.push(
            num(d.bankCode, 3) +
              batchNumber +
              num('3', 1) +
              num(batchRecordSeq, 5) +
              alpha('R', 1) +
              alpha(d.filler1, 1) +
              num(d.movementCode, 2) +
              num(d.discountCode2, 1) +
              date(d.discountDate2, 8) +
              decimal(d.discountAmount2, 15) +
              num(d.discountCode3, 1) +
              date(d.discountDate3, 8) +
              decimal(d.discountAmount3, 15) +
              num(d.penaltyTypeCode, 1) +
              date(d.penaltyDate, 8) +
              decimal(d.penaltyAmount, 15) +
              alpha(d.filler2, 10) +
              alpha(d.message3, 40) +
              alpha(d.message4, 40) +
              alpha(d.filler3, 61),
          );
          batchRecordSeq++;
        } else if (d.segmentCode === 'S') {
          // S segment has two variants
          if (d.printingCode === '1') {
            lines.push(
              num(d.bankCode, 3) +
                batchNumber +
                num('3', 1) +
                num(batchRecordSeq, 5) +
                alpha('S', 1) +
                alpha(d.filler1, 1) +
                num(d.movementCode, 2) +
                num(d.printingCode, 1) +
                num(d.printingLine, 2) +
                num(d.receiptMessageCode, 1) +
                alpha(d.receiptMessage, 100) +
                alpha(d.filler2, 119),
            );
          } else if (d.printingCode === '2') {
            lines.push(
              num(d.bankCode, 3) +
                batchNumber +
                num('3', 1) +
                num(batchRecordSeq, 5) +
                alpha('S', 1) +
                alpha(d.filler1, 1) +
                num(d.movementCode, 2) +
                num(d.printingCode, 1) +
                alpha(d.message5, 40) +
                alpha(d.message6, 40) +
                alpha(d.message7, 40) +
                alpha(d.message8, 40) +
                alpha(d.message9, 40) +
                alpha(d.filler2, 22),
            );
          }
          batchRecordSeq++;
        }
      } else if (entry.entryType === 'FILE_TRAILER') {
        // File Trailer (type 9)
        lines.push(
          num('033', 3) +
            num('9999', 4) +
            num('9', 1) +
            alpha('', 9) +
            num('1', 6) + // Quantidade de lotes do arquivo (hardcoded 1 batch)
            num(lines.length + 1, 6) + // Quantidade de registros do arquivo
            alpha('', 211),
        );
      }
    }

    // Ensure all lines are 240 chars
    return lines.map((l) => l.padEnd(240, ' ')).join('\r\n');
  }
}
