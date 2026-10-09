import type { GeneratorOptions } from "../models/generator-options";

export function componentTsTemplate(componentName: string): string {
  return `import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-${componentName}',
  standalone: true,
  templateUrl: './${componentName}.component.html',
  styleUrl: './${componentName}.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ${toClassName(componentName)}Component {}
`;
}

export function componentHtmlTemplate(name: string): string {
  return `<p>${"${"}componentName} works!</p>
`;
}

export function componentScssTemplate(): string {
  return ``;
}

export function componentSpecTemplate(componentName: string): string {
  return `import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ${toClassName(componentName)}Component } from './${componentName}.component';

describe('${toClassName(componentName)}Component', () => {
  let component: ${toClassName(componentName)}Component;
  let fixture: ComponentFixture<${toClassName(componentName)}Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [${toClassName(componentName)}Component]
    }).compileComponents();

    fixture = TestBed.createComponent(${toClassName(componentName)}Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
`;
}

function toClassName(value: string): string {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}
