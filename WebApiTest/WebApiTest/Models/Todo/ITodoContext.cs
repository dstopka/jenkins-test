using MongoDB.Driver;

namespace WebApiTest.Models.Todo
{
    public interface ITodoContext
    {
        IMongoCollection<Todo> Todos { get; }
    }
}