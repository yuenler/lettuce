function separateTextByNumbers(inputText) {
    // Use a regular expression to split the text by numbers
    const textArray = inputText.split(/\d+/);
  
    // Filter out any empty strings from the result
    const filteredArray = textArray.filter((text) => text.trim() !== '');
  
    return filteredArray;
  }
  
  // Example usage:
  const inputText = "Hello 123 World 456 This 789 Is 42 A 12 Test";
  const separatedText = separateTextByNumbers(inputText);
  console.log(separatedText);