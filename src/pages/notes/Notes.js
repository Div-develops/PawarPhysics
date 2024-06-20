import React, { useState, useEffect } from "react";
import { getDownloadURL, listAll, ref, getMetadata } from "firebase/storage";
import { storage } from "../../index"; // Update the path to your Firebase config file
import Button from "@mui/material/Button";
import Navbar from "../Navbar/Navbar";
import "./notes.css";

function Notes() {
  const [fileData, setFileData] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [className, setClassName] = useState("files");
  const [activeButton, setActiveButton] = useState("XI");

  const fetchFiles = async (folderRef) => {
    const itemList = await listAll(folderRef);
    const filePromises = itemList.prefixes.map(async (subFolderRef) => {
      const subItems = await listAll(subFolderRef);
      const subFilePromises = subItems.items.map(async (itemRef) => {
        const url = await getDownloadURL(itemRef);
        const metadata = await getMetadata(itemRef);
        const fileExtension = metadata.name.split('.').pop().toLowerCase();

        return { url, name: metadata.name, folder: subFolderRef.name, fileExtension };
      });
      return Promise.all(subFilePromises);
    });
    return Promise.all(filePromises).then((results) => results.flat());
  };

  const fetchData = async () => {
    try {
      setLoading(true);

      const cachedFileData = JSON.parse(localStorage.getItem("fileData")) || {};
      if (cachedFileData[className]) {
        setFileData(cachedFileData);
        setFilteredData(cachedFileData[className]);
        setLoading(false);
        return;
      }

      const folderRef = ref(storage, className); // Use className for folder selection
      const files = await fetchFiles(folderRef);

      const newFileData = { ...cachedFileData, [className]: files };
      setFileData(newFileData);
      setFilteredData(files);
      localStorage.setItem("fileData", JSON.stringify(newFileData));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [className]); // Update useEffect dependency to refetch on className change

  useEffect(() => {
    localStorage.removeItem("fileData");
    fetchData();
  },[])// update useffect to refetch on page load

  const getImageUrl = (folderName) => {
    const image = filteredData.find(
      (file) =>
        file.folder === folderName &&
        file.name.toLowerCase().endsWith(".jpg" || ".jpeg" || ".png")
    );
    return image ? image.url : null;
  };

  const handleSearch = (searchValue) => {
    console.log(fileData)
    console.log(fileData[className])

    const filteredFiles = fileData[className].filter((file) =>
      file.folder.toLowerCase().includes(searchValue.toLowerCase().trim())
    );
    console.log(filteredFiles)
    setFilteredData(filteredFiles);
  };

  const handleClick = (e) => {
    const selectedClass = e.target.innerText;
    setClassName(selectedClass === "XI" ? "files" : selectedClass);
    setActiveButton(selectedClass);
  };

  return (
    <>
      <Navbar onSearch={handleSearch} />
      <div
        style={{
          backgroundColor: "rgb(249,243,235)",
          minHeight: "100vh",
        }}
      >
        {loading ? (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        ) : (
          <>
            <div className="notes-container">
              <div className="notes-btn-container">
                {["IX", "X", "XI"].map((classLabel) => (
                  <Button
                    key={classLabel}
                    variant="outlined"
                    size="small"
                    className="button-50"
                    onClick={handleClick}
                    style={{
                      border: activeButton === classLabel ? "2px solid #D24545" : "inherit",
                    }}
                  >
                    {classLabel}
                  </Button>
                ))}
              </div>

              <div className="notes-g-container">
                {filteredData
                  .filter((file) => file.name.endsWith(".pdf"))
                  .map((file) => (
                    <div key={file.name} className="note-item">
                      <a href={file.url} type="application/pdf">
                        <img
                          src={getImageUrl(file.folder)}
                          className="image-notes"
                          alt={file.folder}
                          loading="lazy"
                        />
                      </a>
                    </div>
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Notes;
