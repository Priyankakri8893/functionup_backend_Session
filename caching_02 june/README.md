# Californium

## Caching

### Cache
Its a memory in a computing system where the data is very quick to access from. The data is not stored permanently

### Why use server side caching
If caching is implemented at server side, then the response time in required APIs can be improved drastically. This becomes more relevant if the logic involves heavy computation.

### What to cache
Cache memory is costly, hence it should be carefully assessed what data should be cached. It is recommended to cache only that data which is either heavily requested and/or requires a lot of computation and for which the user experience matters a lot. For example, if implementing a quiz, we would want to store the temporary score in cache instead of storing that in db for each question and then accessing it again to update the score on the next submission.

### When to update/ invalidate cache
This is decided by the use case. For example in a very simple example assuming we are caching a user's profile so that it is quickly fetch when required (Again the example is for the sake of simplicity). If a user has updated some part of the profile then the cached value is no more valid. So in this case that value should be invalidated (in other words removed from cache storage)

### How to cache data
There are different libraries in different technologies to implement this. Here we are using a package called redis. There is a fixed syntax that this package requires. Using the syntax we can execute multiple redis commands - Command to store data, retrieve it, delete it and so on

### How to access cached data
In redis the cached data is accessed with it keys. Data is always stored in key value form. Value can have different data types. The value can be a simple string, or a list or an object and etc.

[Redis Documentation](https://redis.io/docs/data-types/)

[Redis commands](https://redis.io/commands/)
