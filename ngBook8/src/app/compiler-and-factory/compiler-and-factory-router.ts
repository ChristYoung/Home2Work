// 学习使用编译器和工厂方法构建动态组件
import { RouterModule, Routes } from '@angular/router';
import { PathLibrary } from 'app/public/path-library';
import { ContainerComponent } from './container/container.component';
import { RunTimeCompilerComponent } from './run-time-compiler/run-time-compiler.component';
import { ModuleWithProviders } from '@angular/core';
import { CustomTemplateRenderComponent } from './custom-template-render/custom-template-render.component';

const routes: Routes = [
  { path: PathLibrary.dynamicContainerByFactory, component: ContainerComponent },
  { path: PathLibrary.runTimeCompiler, component: RunTimeCompilerComponent },
  { path: PathLibrary.customRender, component: CustomTemplateRenderComponent },
];

export const compilerAndFactoryRouter: ModuleWithProviders = RouterModule.forChild(routes);
