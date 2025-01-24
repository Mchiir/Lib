export const index = async (req, res) => {
    try {
        // Simulating a list of books (usually you'd get this from a database)
        const books = [
          { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
          { id: 2, title: "1984", author: "George Orwell" }
        ];
    
        // Sending the list of books as the response
        res.status(200).json(books);
      } catch (err) {
        res.status(500).json({ message: "An error occurred", error: err.message });
    }
}