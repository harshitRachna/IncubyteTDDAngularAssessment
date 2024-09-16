import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  /**
   * The add method takes a string input that can optionally start with a custom delimiter.
   * It splits the input based on the delimiter or default comma and returns the sum of the numbers.
   * If the string contains negative numbers, it throws an error.
   *
   * @param numberString - The input string containing numbers, potentially with a custom delimiter.
   * @returns The sum of the numbers in the string.
   */
  add(numberString: string): number {
    // Check if the string starts with a custom delimiter (format: //[delimiter]\n[numbers])
    if (numberString.startsWith("//")) {
      // Split the string into delimiter and numbers part
      let [delimiter, numString] = numberString.split('\n');
      // Use the custom delimiter and calculate the sum
      return this.calculateSum(numString.split(delimiter.slice(2)));
    }

    // If no custom delimiter, replace newlines with commas and split the numbers
    const sum: number = this.calculateSum(numberString.replaceAll('\n', ',').split(','));

    // If sum is not a valid number and not zero, throw an error for invalid input
    if (!sum && sum !== 0) {
      throw Error("Please enter a valid format for the string of numbers.");
    }
    return sum;
  }

  /**
   * The calculateSum method processes an array of number strings.
   * It checks for negative numbers and throws an error if found, otherwise, it calculates the sum.
   *
   * @param numArray - An array of number strings to be summed up.
   * @returns The sum of the numbers in the array.
   */
  calculateSum(numArray: string[]) {
    // Filter out negative numbers from the array
    let negatives = numArray.filter(num => +num < 0);

    // If there are negative numbers, throw an error with the list of negative numbers
    if (negatives.length) {
      throw new Error(`negative numbers not allowed ${negatives.join(', ')}`);
    }

    // Convert the string numbers to integers and calculate the sum using reduce
    return numArray.reduce((sum, num) => sum + +num, 0);
  }
}
