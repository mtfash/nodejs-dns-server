import { maxUInt16 } from './constants';
import { DNSMessageBuilder } from './dns-message-builder';
import { Opcode, ResponseCode } from './header';

describe('DNSMessageBuilder', () => {
  let builder: DNSMessageBuilder;

  beforeEach(() => {
    builder = new DNSMessageBuilder();
  });

  describe('setId()', () => {
    it('should set the id property of target DNSMessage object', () => {
      const message = builder.setId(1234).build();
      expect(message.id).toBe(1234);
    });
  });

  describe('setIsQuery()', () => {
    it('should set the query type of target DNSMessage object', () => {
      const message = builder.setIsQuery(true).build();
      expect(message.isQuery).toBe(true);
    });
  });

  describe('setOpcode()', () => {
    it('should set the opcode of the target DNSMessage object', () => {
      const message = builder.setOpcode(Opcode.IQUERY).build();
      expect(message.opcode).toBe(Opcode.IQUERY);
    });
  });

  describe('setIsAuthoritative()', () => {
    it('should set the authoritative property of the target DNSMessage object', () => {
      const message = builder.setIsAuthoritative(true).build();
      expect(message.authoritative).toBe(true);
    });
  });

  describe('setTruncated()', () => {
    it('should set the truncated property of the target DNSMessage object', () => {
      const message = builder.setTruncated(true).build();
      expect(message.truncated).toBe(true);
    });
  });

  describe('setRecursionDesired()', () => {
    it('should set the recursionDesired property of the target DNSMessage object', () => {
      const message = builder.setRecursionDesired(true).build();
      expect(message.recursionDesired).toBe(true);
    });
  });

  describe('setRecursionAvailable()', () => {
    it('should set the recursionAvailable property of the target DNSMessage object', () => {
      const message = builder.setRecursionAvailable(true).build();
      expect(message.recursionAvailable).toBe(true);
    });
  });

  describe('setResponseCode()', () => {
    it('should set the responseCode property of the target DNSMessage object', () => {
      const rcode = ResponseCode.NotImplemented;
      const message = builder.setResponseCode(rcode).build();
      expect(message.responseCode).toBe(rcode);
    });
  });

  describe('setQDCount()', () => {
    it('should set the qdcount property of the target DNSMessage object', () => {
      const message = builder.setQDCount(5).build();
      expect(message.qdcount).toBe(5);
    });

    it('should throw an error if a value outside the acceptable range is provided', () => {
      expect(() => {
        builder.setQDCount(-1);
      }).toThrow('out of range');

      expect(() => {
        builder.setQDCount(maxUInt16 + 1);
      }).toThrow('out of range');
    });
  });

  describe('setANCount()', () => {
    it('should set the ancount property of the target DNSMessage object', () => {
      const message = builder.setANCount(3).build();
      expect(message.ancount).toBe(3);
    });

    it('should throw an error if a value outside the acceptable range is provided', () => {
      expect(() => {
        builder.setANCount(-1);
      }).toThrow('out of range');

      expect(() => {
        builder.setANCount(maxUInt16 + 1);
      }).toThrow('out of range');
    });
  });

  describe('setNSCount()', () => {
    it('should set the nscount property of the target DNSMessage object', () => {
      const message = builder.setNSCount(8).build();
      expect(message.nscount).toBe(8);
    });

    it('should throw an error if a value outside the acceptable range is provided', () => {
      expect(() => {
        builder.setNSCount(-1);
      }).toThrow('out of range');

      expect(() => {
        builder.setNSCount(maxUInt16 + 1);
      }).toThrow('out of range');
    });
  });

  describe('setARCount()', () => {
    it('should set the arcount property of the target DNSMessage object', () => {
      const message = builder.setARCount(4).build();
      expect(message.arcount).toBe(4);
    });

    it('should throw an error if a value outside the acceptable range is provided', () => {
      expect(() => {
        builder.setARCount(-1);
      }).toThrow('out of range');

      expect(() => {
        builder.setARCount(maxUInt16 + 1);
      }).toThrow('out of range');
    });
  });
});
