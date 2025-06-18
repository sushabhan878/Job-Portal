import React, { useContext, useEffect, useRef, useState } from "react";
import Quill from "quill";
import { JobCategories, JobLocations } from "../assets/assets";
import axios from "axios";
import AppContext from "../context/AppContext";
import { toast } from "react-toastify";
const AddJob = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("Bangalore");
  const [category, setCategory] = useState("Programming");
  const [level, setLevel] = useState("Beginner Level");
  const [salary, setSalary] = useState(0);

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const { backendUrl, companyToken } = useContext(AppContext);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const description = quillRef.current.root.innerHTML;
      const { data } = await axios.post(
        backendUrl + "/api/company/post-job",
        { title, description, location, category, salary, level },
        { headers: { token: companyToken } }
      );
      if (data.success) {
        toast.success(data.message);
        setTitle("");
        setSalary(0);
        quillRef.current.root.innerHTML = "";
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    // Initiate Quill only once
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
      });
    }
  }, []);
  return (
    <form
      onSubmit={onSubmitHandler}
      className="container p-4 flex flex-col w-full items-start gap-3 "
      action=""
    >
      <div className="w-full ">
        <p className="mb-2">Job Title</p>
        <input
          className="w-full max-w-lg px-3 py-2 border-2 border-gray-300 rounded"
          type="text"
          placeholder="Title Here"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
        />
      </div>
      <div className="w-full max-w-lg">
        <p className="mb-2">Job Description</p>
        <div ref={editorRef}></div>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 w-full lg:gap-8">
        <div>
          <p className="mb-2">Job Category</p>
          <select
            className="w-full px-3 py-2 border-2 border-gray-300 rounded"
            onChange={(e) => setCategory(e.target.value)}
          >
            {JobCategories.map((category, index) => (
              <option value={category} key={index}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p className="mb-2">Job Location</p>
          <select
            className="w-full px-3 py-2 border-2 border-gray-300 rounded"
            onChange={(e) => setLocation(e.target.value)}
          >
            {JobLocations.map((location, index) => (
              <option value={location} key={index}>
                {location}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p className="mb-2">Job Level</p>
          <select
            className="w-full px-3 py-2 border-2 border-gray-300 rounded"
            onChange={(e) => setLevel(e.target.value)}
          >
            <option value="Beginner Level">Beginner Level</option>
            <option value="Intermidiate Level">Intermidiate Level</option>
            <option value="Senior Level">Senior Level</option>
          </select>
        </div>
      </div>
      <div>
        <p className="mb-2">Job Salary</p>
        <input
          min={0}
          className="w-full px-3 py-2 border-2 border-gray-300 rounded am:w-[120px ]"
          onChange={(e) => setSalary(e.target.value)}
          value={salary}
          type="Number"
          placeholder="25000"
        />
      </div>
      <button className="w-28 py-3 mt-4 bg-black text-white rounded">
        ADD
      </button>
    </form>
  );
};

export default AddJob;
