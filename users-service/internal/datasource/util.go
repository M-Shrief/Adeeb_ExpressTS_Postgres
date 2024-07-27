package datasource

import (
	"encoding/hex"
	"fmt"

	"github.com/jackc/pgx/v5/pgtype"
)

func UUIDToString(uuid pgtype.UUID) string {
	uuidStr := fmt.Sprintf("%x-%x-%x-%x-%x", uuid.Bytes[0:4], uuid.Bytes[4:6], uuid.Bytes[6:8], uuid.Bytes[8:10], uuid.Bytes[10:16])
	return uuidStr
}

func StringToUUID(str string) (dst [16]byte, err error) {
	switch len(str) {
	case 36:
		str = str[0:8] + str[9:13] + str[14:18] + str[19:23] + str[24:]
	case 32:
		// dashes already stripped, assume valid
	default:
		// assume invalid.
		return dst, fmt.Errorf("cannot parse UUID %v", str)
	}

	buf, err := hex.DecodeString(str)
	if err != nil {
		return dst, err
	}

	copy(dst[:], buf)
	return dst, err
}
