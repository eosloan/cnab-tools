export type ErrorContext = {
  prefix: string;
  lineNumber?: number;
  lineContent?: string;
  startCol?: number;
  endCol?: number;
};

export class CnabError extends Error {
  public code: string;
  public lineNumber?: number;
  public lineContent?: string;
  public startCol?: number;
  public endCol?: number;

  constructor({
    message,
    code,
    lineNumber,
    lineContent,
    startCol,
    endCol,
  }: ErrorContext & { message: string; code: string }) {
    super(message);

    // Set the prototype explicitly (important for instanceof to work)
    Object.setPrototypeOf(this, new.target.prototype);

    // this.name = this.constructor.name;
    this.code = code;
    this.lineNumber = lineNumber;
    this.lineContent = lineContent;
    this.startCol = startCol;
    this.endCol = endCol;

    // capture stack trace (better debugging)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export function makeMessage(text: string, ctx: ErrorContext) {
  return text + "\n" + ctx.prefix + "\n";
}

export class UnsupportedLayoutError extends CnabError {
  constructor(ctx: ErrorContext) {
    super({
      ...ctx,
      message: makeMessage(
        `${UnsupportedLayoutError.name}: O layout detectado não é suportado`,
        ctx,
      ),
      code: "unsupported-layout",
    });
  }
}

export class LineLengthError extends CnabError {
  constructor(ctx: ErrorContext) {
    super({
      ...ctx,
      message: makeMessage(
        `${LineLengthError.name}: A linha não possui o tamanho esperado`,
        ctx,
      ),
      code: "invalid-line-length",
    });
  }
}

export class InvalidRecordTypeError extends CnabError {
  constructor(ctx: ErrorContext) {
    super({
      ...ctx,
      message: makeMessage(
        `${InvalidRecordTypeError.name}: Tipo de registro desconhecido`,
        ctx,
      ),
      code: "invalid-record-type",
    });
  }
}

export class InvalidRecordFormatError extends CnabError {
  constructor(ctx: ErrorContext) {
    super({
      ...ctx,
      message: makeMessage(
        `${InvalidRecordFormatError.name}: O registro não está formatado corretament`,
        ctx,
      ),
      code: "invalid-record-format",
    });
  }
}
