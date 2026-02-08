import React from "react";
import profilePic from "/profile.png";

const Post = ({ postData }) => {
  return (
    <div className="flex flex-col gap-2 border-2 border-gray-300 rounded-lg p-4 w-full max-w-xl shadow-md">
      {/* Post Header: Title and Status */}
      <div className="flex justify-between items-start gap-4">
        <p className="font-semibold">{postData.title}</p>
        <div className={`text-sm text-nowrap py-0.5 px-1.5 rounded-lg` + " " + getStatusColor(postData.status)}>
          {postData.status}
        </div>
      </div>
      {/* Post Body: Posted By and Category*/}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img
            src={profilePic}
            alt="Post Image"
            className="w-8 h-auto rounded-full"
          />
          <p>{postData.postedBy}</p>
        </div>
        <p className="text-sm" >{postData.category}</p>
      </div>
      {/* Post Description and Attachements */}
      <div>
        <p className="text-sm">{postData.description}</p>
      </div>
      {/* Tags and TimeStamp */}
      <div className="flex justify-between">
        <div>
          {postData.tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-gray-200 rounded-full px-2 py-0.5 mr-1"
            >
              #{tag}  
            </span>
          ))}
        </div>
        <div className="text-xs text-gray-700 mt-1">
          {getFormattedDate(postData.createdAt)}
        </div>
      </div>
      {/* Comments Section */}
      {/* <div>Comments</div> */}
    </div>
  );
};

function getFormattedDate(dateString) {
  const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  const timeOptions = { hour: '2-digit', minute: '2-digit' }
  const formattedDate = new Date(dateString).toLocaleDateString(undefined, dateOptions);
  const formattedTime = new Date(dateString).toLocaleTimeString(undefined, timeOptions);
  return `${formattedTime} | ${formattedDate}`;
}

function getStatusColor(status) {
  switch (status) {
    case "Open":
      return "bg-green-200 text-green-800";
    case "Active":
      return "bg-blue-200 text-blue-800"; 
    case "Closed":
      return "bg-red-200 text-red-800";
    default:
      return "bg-gray-200 text-gray-800";
  }
}

export default Post;
