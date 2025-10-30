import React, { useState } from 'react'; 

const initialState = {
  title: '',
  description: '',
  category: '',
  tags: '',
  images: [],
};

const CreatePost = () => {
  const [formData, setFormData] = useState(initialState);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleFileChange = (e) => {
    setFormData(prevData => ({
      ...prevData,
      images: Array.from(e.target.files), 
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const dataToSubmit = new FormData();
    
    dataToSubmit.append('title', formData.title);
    dataToSubmit.append('description', formData.description);
    dataToSubmit.append('category', formData.category);
    dataToSubmit.append('tags', formData.tags);

    for (const file of formData.images) {
      dataToSubmit.append('images', file);
    }
    
    console.log('--- Submitting the following FormData ---');
    for (let [key, value] of dataToSubmit.entries()) {
      console.log(key, value);
    }

    // --- In a real app, you would send 'dataToSubmit' ---
    /*
    try {
      const response = await fetch('/api/your-endpoint', {
        method: 'POST',
        body: dataToSubmit, // Send the FormData object
      });

      if (response.ok) {
        console.log('Post created successfully!');
        setFormData(initialState); // Clear the form on success
      } else {
        console.error('Failed to create post');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
    */
    
    // For this demo, just log and reset the form
    alert('Form submitted! Check the console.');
    setFormData(initialState);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto text-md">
      <h1 className="text-2xl font-bold mb-6">Create New Post</h1>
      
      <form 
        onSubmit={handleSubmit}
        className="flex flex-col gap-6"
      >
                <div>
          <label htmlFor="title" className="block font-semibold mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
            placeholder="e.g., Need Help in React Basics / DSA"
          />
        </div>

        <div>
          <label htmlFor="description" className="block font-semibold mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows="2"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
            placeholder="Describe the help you're seeking..."
          ></textarea>
        </div>

        <div>
          <label htmlFor="category" className="block font-semibold mb-1">
            Category
          </label>
          <select
            id="category"
            name="category"
            required
            value={formData.category}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
          >
            <option value="" disabled>Select a category</option>
            <option value="tech">Technology</option>
            <option value="creative">Creative Arts</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="business">Business</option>
            <option value="academics">Academics</option>
          </select>
        </div>
        <div>
          <label className="block font-semibold mb-1">
            Images
          </label>
          <label
            htmlFor="images"
            className="flex flex-col items-center justify-center w-full p-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition"
          >
            <span className="material-symbols-outlined text-4xl text-gray-400">
              upload_file
            </span>
            <span className="mt-2 text-sm text-gray-600">
              Click or drag to upload (optional)
            </span>
          </label>
          <input
            type="file"
            id="images"
            name="images"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          
          {formData.images.length > 0 && (
            <div className="mt-4">
              <p className="font-semibold text-sm">Selected files:</p>
              <ul className="list-disc list-inside space-y-1 mt-1 text-gray-700">
                {formData.images.map((file, index) => (
                  <li key={index} className="text-sm truncate">
                    {file.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div>
          <label htmlFor="tags" className="block font-semibold mb-1">
            Tags
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags} 
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
            placeholder="e.g., react, cooking, javascript (comma-separated)"
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-gray-900 text-white p-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors duration-200"
          >
            Create Post
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatePost;