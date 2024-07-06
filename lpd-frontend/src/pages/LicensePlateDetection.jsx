import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Alert from "../components/Alert";
import Header from "../components/Header";
import Footer from "../components/Footer";

function LicensePlateDetection() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [render, setRender] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [resp, setResp] = useState(null);
  const [status, setStatus] = useState("success");
  const location = useLocation();
  const param = location.state;
  // console.log(param);

  const fetchData = async () => {
    try {
      const url = "https://aniketsoni.pythonanywhere.com/login?username=" + param.username;
      const method = "GET";
      const content = "application/json";
      const result = await getResponse(url, null, method, content);
      // console.log("Data:", result);
      setData(result);
    } catch (error) {
      console.error("Error:", error);
      // Handle the error as needed
    } finally {
      setLoading(false);
    }
  };

  function restore() {
    setRender(false);
    setResp(null);
    setSelectedFile(null);
    setPreviewUrl(null);
    setStatus("success");
    document.getElementById("photoupload").reset();
  }

  if (loading) {
    fetchData(); // Fetch data before rendering
    return <div>Loading...</div>;
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedFile(null);
      setPreviewUrl(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      console.error("No file selected");
      return;
    }

    try {
      setRender(true);
      const url = "https://aniketsoni.pythonanywhere.com/upload";
      const method = "POST";
      const formData = new FormData();
      formData.append("image", selectedFile);
      // const content = 'multipart/form-data';
      const result = await getResponse(url, formData, method, null);
      setResp(result);
      setStatus("success");
      console.log(result);
    } catch (error) {
      console.error("Error uploading image:", error);
      setStatus("failure");
      console.log(status);
      setResp(error);

    } finally {
      setRender(false);
    }
  };

  if (data.status === "success") {
    return (
      <>
        <div className="flex flex-col justify-center items-center h-screen  bg-[linear-gradient(to_right_bottom,rgba(135,65,255,0.5),rgba(135,65,255,0)),url('https://images.unsplash.com/photo-1534706438758-534c634c4591?q=80&w=2439&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover">
          <div
            className={
              "max-w-md mx-auto mt-8 p-4 bg-gray-100 rounded-md shadow-md" +
              (resp || render ? " hidden" : "")
            }
          >
            <form
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              id="photoupload"
            >
              <label
                htmlFor="photoInput"
                className="block text-sm font-medium text-gray-700"
              >
                Upload Photo
              </label>
              <input
                type="file"
                name="image"
                required
                id="photoInput"
                accept="image/*"
                onChange={handleFileChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-custom-blue4"
              />
              {previewUrl && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700">Preview:</p>
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="mt-2 max-w-full h-32 rounded-md"
                  />
                </div>
              )}
              <button
                encType="multipart/form-data"
                type="submit"
                className="mt-4 p-2 w-full font-bold bg-violet-600 hover:bg-white text-white rounded-md hover:text-violet-900 border border-violet-700 focus:outline-none focus:shadow-outline-blue"
              >
                Submit
              </button>
            </form>
          </div>
          {render ? (
            // Code to render when additionalCondition is true
            <div class="flex space-x-2 justify-center items-center bg-transparent">
              <span class="sr-only">Loading...</span>
              <div class="h-4 w-4 bg-white border-violet-600 border-2 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div class="h-4 w-4 bg-white border-violet-600 border-2 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div class="h-4 w-4 bg-white border-violet-600 border-2 rounded-full animate-bounce"></div>
            </div>
          ) : (
            ""
          )}
          {/* Additional if-else condition */}
          {resp && status==="success" ? (
            // Code to render when additionalCondition is true
            <>
              <div className="p-6 flex flex-col rounded-lg shadow-md bg-violet-700 text-white text-4xl">
                {resp.result}
                  <button
                    class="bg-white m-2 text-base font-semibold justify-center hover:bg-violet-900 text-violet-900  hover:text-white border border-violet-900 hover:border-transparent rounded"
                    onClick={() => {
                      navigator.clipboard.writeText(resp.result);
                    }}
                  ><a href="https://www.rtovehicleinformation.com/" target="_blank" rel="noreferrer">
                    Get Details
                    </a>
                  </button>
              </div>
              <button
                class="bg-white mt-4 hover:bg-violet-900 text-violet-900 font-semibold hover:text-white py-2 px-4 border border-violet-900 hover:border-transparent rounded"
                onClick={restore}
              >
                Upload Another
              </button>
            </>
          ) : (
            <>
            {status==="failure" ? (
            // Code to render when additionalCondition is true
            <>
                 <Alert type={status} message={resp+""}/>
                 <button
                class="bg-white mt-4 hover:bg-violet-900 text-violet-900 font-semibold hover:text-white py-2 px-4 border border-violet-900 hover:border-transparent rounded"
                onClick={restore}
              >
                Upload Another
              </button> 
              </>

          ) : (
            
            ""
          )}
            </>
          )}
          
        </div>
      </>
    );
  } else {
    return (
      <>
        <Header />
        <Alert type={status} message={"You need to login"}/> 
        <Footer />
      </>
    );
  }
}

async function getResponse(url, dataurl, method, contentType) {
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        ...(contentType !== null ? { "Content-Type": contentType } : {}),
        "Access-Control-Allow-Origin": "https://aniketsoni.pythonanywhere.com/*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "*",
      },
      body: dataurl,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json(); // Extracting data as a JSON Object from the response

    // Depending on your use case, you might want to return or do something with the data
    return data;
  } catch (error) {
    throw error;
    // Handle the error as needed
  }
}

export default LicensePlateDetection;
