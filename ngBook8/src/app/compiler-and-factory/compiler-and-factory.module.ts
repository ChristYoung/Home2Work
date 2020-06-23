// 学习使用编译器和工厂方法构建动态组件
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContainerComponent } from './container/container.component';
import { compilerAndFactoryRouter } from './compiler-and-factory-router';
import { RunTimeCompilerComponent } from './run-time-compiler/run-time-compiler.component';
import { CustomTemplateRenderComponent } from './custom-template-render/custom-template-render.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    compilerAndFactoryRouter,
  ],
  declarations: [ContainerComponent, RunTimeCompilerComponent, CustomTemplateRenderComponent]
})
export class CompilerAndFactoryModule {
}
