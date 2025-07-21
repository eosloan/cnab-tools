import { expect, it, describe } from "vitest";
import { generate, parse, calculateDacAgenciaConta } from "../../src/itau-400";

describe("itau-400", () => {
  it("calculates DAC agencia conta correctly", () => {
    expect(calculateDacAgenciaConta("1234", "56789")).toBe("7");
    expect(calculateDacAgenciaConta("", "")).toBe("0");
  });

  it.each(["VALID.txt", "VALID2.txt"])(
    "generate output matches original %s file (roundtrip snapshot)",
    async (file) => {
      const fs = await import("fs/promises");
      const path = await import("path");
      const remPath = path.resolve(__dirname, file);
      const original = await fs.readFile(remPath, "utf8");

      // Parse and then generate
      const { entries: parsed } = parse(original);
      const generated = generate(parsed);

      // Normalize both to CRLF and trim trailing newlines for strict comparison
      const normalize = (s: string) =>
        s.replace(/\r?\n/g, "\r\n").replace(/(\r\n)+$/g, "");

      // console.log(diffs);
      expect(normalize(generated)).toBe(normalize(original));
    },
  );
});
