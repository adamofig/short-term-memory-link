export function getNextId(currentId: string): string {
  let reverseKey = currentId.split("").reverse();
  for (let i = 0; i < currentId.length; i++) {
    const { char, carry } = getNextChar(reverseKey[i]);
    reverseKey[i] = char;
    if (carry) {
      continue;
    } else {
      break;
    }
  }
  const newId = reverseKey.reverse().join("");
  if (newId === "000") {
    console.log("no more ids, contact the developer");
    return "000";
  } else {
    return newId;
  }
}

function getNextChar(char: string) {
  const validChars = "0123456789abcdefghijklmnopqrstuvwxyz";
  const length = validChars.length;
  const index = validChars.indexOf(char);
  if (index === length - 1) {
    return { char: validChars[0], carry: true };
  } else {
    return { char: validChars[index + 1], carry: false };
  }
}
