using WebApiTest.Models.Todo;
using Xunit;

namespace Test
{
    public class TodoTest
    {
        [Fact]
        public void CanCreateTodo()
        {
            const string title = "TestTitle";
            const string content = "TestContent";
            const int id = 1;

            var todo = new Todo {
                TodoId = id,
                Title = title,
                Content = content
            };
            
            Assert.NotNull(todo);
            Assert.Equal(title, todo.Title);
            Assert.Equal(id, todo.TodoId);
            Assert.Equal(content, todo.Content);
        }
    }
}