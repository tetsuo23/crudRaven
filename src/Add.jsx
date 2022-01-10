import { useForm } from "react-hook-form";
import axios from "axios";

export default function Add(props) {
    // 1.
    const { register, handleSubmit } = useForm();
    // 2.
    const onSubmit = (data) => {
      console.log(data);
      addReview(data);
    };
  
    // function to make a POST req to the server to insert data to MySQL db
    const addReview = (data) => {
      axios.post("http://localhost:3000/livre", data).then(() => {
        // 4.
        props.setLivre([...props.livre, {data}]);
      });
    };

    return (
        <form className="add-review" onSubmit={handleSubmit(onSubmit)}>
          <h4>Add Review</h4>
          <input
            type="text"
            placeholder="Book Title"
            name="book_title"
            {...register('book_title',{ required: true, maxLength: 40 })}
          />
          <input
            type="text"
            placeholder="Review"
            name="book_review"
            {...register('book_review',{ required: true, maxLength: 450 })}
          />
          <input
            type="number"
            placeholder="Rating"
            name="book_rating"
            {...register('book_rating',{ required: true, max: 5, min: 0 })}
          />
    
          <input id="btn" type="submit" />
        </form>
      );
    
  }