using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace WebApiTest.Models.Todo
{
    public class Todo
    {
        [BsonId]
        public ObjectId InternalId { get; set; }
        public long TodoId { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
    }
}