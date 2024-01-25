package auth

import (
	"fmt"

	"golang.org/x/crypto/bcrypt"
)

// Hashing the password with the default cost of 10
func Hash(password string) (string, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", fmt.Errorf("couldn't hash password: %v", err)
	}
	return string(hashedPassword), nil
}

func CompareHash(hashedPassword, password string) error {
	// Comparing the password with the hash
	err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
	if err != nil {
		return fmt.Errorf("password is incorrect")
	}
	return nil
}
