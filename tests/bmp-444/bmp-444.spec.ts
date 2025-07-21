import { describe, it, expect } from "vitest";
import {
  parseHeader,
  parseDetail,
  parseTrailer,
  parse,
  generate,
  convertToItau400Remessa,
} from "../../src/bmp-444";

const headerLine =
  "01REMESSA01COBRANCA       00000000000045684942COMPANY                       611PAULISTA S.A.  070525        MX0000014                                                                                                                                                                                                                                                                                                                                 000001";

const detailLine =
  "1" +
  " ".repeat(36) +
  "OURNUMBEREXAMPLE         " +
  "0".repeat(3) +
  "0".repeat(5) +
  " ".repeat(11) +
  " " +
  "0".repeat(10) +
  " " +
  " " +
  "000000" +
  " ".repeat(8) +
  "MX" +
  "0".repeat(7) +
  " ".repeat(321) +
  "000002";

const trailerLine = "9" + " ".repeat(437) + "000003";

describe("bmp-444", () => {
  it("parses a valid header line", () => {
    expect(() => parseHeader(headerLine, 0)).not.toThrow();
    const header = parseHeader(headerLine, 0);
    expect(header.bankCode).toBe("611");
    expect(header.originatorName).toContain("COMPANY");
    expect(header.remessaLiteral).toBe("REMESSA");
  });

  it("throws on invalid header", () => {
    const badHeader = "99REMESSA01COBRANCA" + " ".repeat(444 - 16);
    expect(() => parseHeader(badHeader, 0)).toThrow();
  });

  it("parses a valid detail line", () => {
    // Minimal valid detail line (first char '1', correct length)
    // Pad to 444
    expect(() => parseDetail(detailLine, 1)).not.toThrow();
    const detail = parseDetail(detailLine, 1);
    expect(detail.recordType).toBe("1");
    expect(detail.participantControlNumber).toBe("OURNUMBEREXAMPLE         ");
  });

  it("throws on invalid detail", () => {
    const badDetail = "2" + " ".repeat(443);
    expect(() => parseDetail(badDetail, 1)).toThrow();
  });

  it("throws on invalid trailer", () => {
    const badTrailer = "8" + " ".repeat(443);
    expect(() => parseTrailer(badTrailer, 1)).toThrow();
  });

  it("parses a valid CNAB 444 file (header, detail, trailer)", () => {
    const lines = [headerLine, detailLine, trailerLine];
    const entries = parse(lines.join("\n")).entries;
    expect(entries.length).toBe(3); // header + detail
    expect(entries[0].recordType).toBe("0");
    expect(entries[1].recordType).toBe("1");
    expect(entries[2].recordType).toBe("9");
  });

  it("throws on wrong line length", () => {
    const badLine = "1".repeat(100); // too short
    expect(() => parse(badLine)).toThrow();
  });

  it("generate output matches original VALID.REM file (roundtrip snapshot)", async () => {
    // Arrange: read VALID.REM as input
    const fs = await import("fs/promises");
    const path = await import("path");
    const remPath = path.resolve(__dirname, "VALID.REM");
    const original = await fs.readFile(remPath, "utf8");

    // Parse and then generate
    const { entries: parsed } = parse(original);
    const generated = generate(parsed);

    // Assert: output is exactly the same as input (ignoring trailing newlines)
    // Normalize both to CRLF and trim trailing newlines for strict comparison
    const normalize = (s: string) =>
      s.replace(/\r?\n/g, "\r\n").replace(/(\r\n)+$/g, "");

    expect(normalize(generated)).toBe(normalize(original));
  });

  it("converts to itau 400 remessa", () => {
    const lines = [headerLine, detailLine, trailerLine];
    const entries = parse(lines.join("\n")).entries;
    const itauEntries = convertToItau400Remessa(entries);
    expect(itauEntries.length).toBe(3);
    expect(itauEntries[0].recordType).toBe("0");
  });
});
