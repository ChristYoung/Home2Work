###Angular相关

*.package.json中的build设置"ng build --base-href ./"可以使打包后的文件直接获取到index.html所在路径的本地资源

*.ts-config.json 中的compilerOptions下的baseUrl设置根路径，在ts文件中import时可以使用绝对路径

*.Typescript描述对象字面量的类型 const a: { [key: string]: any }

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
