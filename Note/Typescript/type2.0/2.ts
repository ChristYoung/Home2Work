declare function test<T>(o: T): T;
const testRes = test({ name: 'hello', userId: 'uiui9d9f7d67sweyu' });
console.log(testRes.userId);
console.log(testRes.name);
