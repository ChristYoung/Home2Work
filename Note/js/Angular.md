## Angular相关

*.package.json中的build设置"ng build --base-href ./"可以使打包后的文件直接获取到index.html所在路径的本地资源

*.ts-config.json 中的compilerOptions下的baseUrl设置根路径，在ts文件中import时可以使用绝对路径

*.Typescript描述对象字面量的类型(可索引接口) const a: { [key: string]: any }

*.ngIf的else语法 *ngIf="isBoolean else otherTemplate" <ng-template #otherTemplate></ng-template>

*. SystemJsNgModuleLoader

*. 运行ng serve --host xxx.xxx.x.xxx（自己的ip地址）,然后别就可以通过你的ip地址访问了

*. 定制化模块如果引入了公用模块, 并且定制化的某个路由名和公用路由名一致的话, 那么定制化模块的路由会被引入的公用路由覆盖

*. Angular动态引入一个类Tess
   import(`app/c-thszxyy/tess`).then(tess => {
        console.log('看看是什么', tess);
        console.log('看看是什么', tess.Tess);
        console.log('看看是什么', new tess.Tess()); // 被实例化了
      });


---updateOn---
Angular 表单, 在执行提交时才触发表单验证
symptom: [null, { validators: [Validators.required], updateOn: "submit" }], // 患者主诉
      medicalHistory: [null, { validators: [Validators.required], updateOn: "submit" }], // 既往史
      illSummary: [null, { validators: [Validators.required], updateOn: "submit" }], // 病史摘要
      diagCode: [null, { validators: [Validators.required], updateOn: "submit" }], // 主诊断
      subDiagnose: [null], // 副诊断
    });
    


## 构建Angular Lib的步骤
### 以下供参考
https://medium.com/@nikolasleblanc/building-an-angular-4-component-library-with-the-angular-cli-and-ng-packagr-53b2ade0701e (需要翻墙)
https://angular.cn/guide/creating-libraries

1. 在任意空位置执行ng new xxx新建一个Angular项目.
2. 执行npm install ng-packagr -D.
3. 在生成好的Angular项目的src同级目录下新建一个projects文件夹.
4. 在projects文件夹下执行ng generate library xxx(库的名字), 它会默认帮我们安装好ng-packager.json.
5. 在库的src/lib目录下开发你的库.
6. 开发完成后, 可以使用 CLI 命令来构建、测试和 lint 这个项目.
   * ng build my-lib
   * ng test my-lib
   * ng lint my-lib
7. 执行 ng build之后会生成一个dist目录, 进入到这个dist目录然后执行 npm pack会在dist目录下生成一个my-component-library-0.0.0.tgz, 0.0.0是从package.json的version中同步过来的.
8. 其他Anglar应用可以执行 npm install ../some_relative_path/dist/my-component-library-0.0.0.tgz来安装你的库.
9. publish your library on npm.
10. 发布到npm 上后, 其他Angular应用想要使用, 执行npm install xxx, 此处的xxx指的是projects目录下的package.json的name, 而不是整个项目下的package.json的name.