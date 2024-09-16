import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it("Allow the add method to handle any amount of numbers (a string of comma-separated numbers)", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    // Input: “”, Output: 0
    expect(app.add("")).toEqual(0);
    // Input: “1,5”, Output: 6
    expect(app.add("1,5")).toEqual(6);
    // Input: “1,5,3,2,4,23”, Output: 38
    expect(app.add("1,5,3,2,4,23")).toEqual(38);
  });

  it("Allow the add method to handle new lines between numbers (instead of commas). (`1\n2,3` should return 6)", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    // Input: “1\n2,3”, Output: 6
    expect(app.add("1\n2,3")).toEqual(6);

  });

  it("Support different delimiters: To change the delimiter, the beginning of the string will contain a separate line that looks like this: `//[delimiter]\n[numbers…]`", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    // Input: “//;\n1;2”, Output: 3
    expect(app.add("//;\n1;2")).toEqual(3);

  });
  it("Calling add with a negative number will throw an exception: `negative numbers not allowed <negative_number>`.", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    // Input: “//;\n1;-2”, Error: 'negative numbers not allowed: -2'
    expect(() => app.add("//;\n1;-2")).toThrowError("negative numbers not allowed -2");

  });

  it("If there are multiple negative numbers, show all of them in the exception message, separated by commas.", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    // Input: “1\n-2,-4,-6”, Error: 'negative numbers not allowed: -2'
    expect(() => app.add("1\n-2,-4,-6")).toThrowError("negative numbers not allowed -2, -4, -6");

  });



});
