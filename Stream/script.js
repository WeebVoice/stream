  const bigIframe = document.getElementById("big-iframe");
  const videoPreviewsContainer = document.getElementById("video-previews");
  const prevButton = document.getElementById("prev-button");
  let currentPage = 1;
  const videosPerPage = 4;
  const maxDisplayedPages = 3; // Maximum number of page buttons to display
  
  let links = []; // Array to store the video links
  let seriesTitle = ""; // Variable to store the series title
  let initialLink = ""; // Variable to store the initial link
  
  // Listen for messages from the parent page
  window.addEventListener("message", function (event) {
    if (event.data && event.data.links && event.data.seriesTitle) {
      links = event.data.links;
      seriesTitle = event.data.seriesTitle;
      initialLink = event.data.initialLink;
  
      // Use the received data to generate video previews
      generateVideoPreviews();
    }
  });
  
  // Function to generate video previews using the received data
  function generateVideoPreviews() {
    videoPreviewsContainer.innerHTML = "";
  
    for (let i = 0; i < links.length; i++) {
      const link = links[i];
  
      // Create video preview container
      const videoPreview = document.createElement("div");
      videoPreview.classList.add("video-preview");
      videoPreview.addEventListener("click", function () {
        changeIframeSource(link);
      });
  
      // Create video preview iframe
      const iframe = document.createElement("iframe");
      iframe.src = link;
      iframe.frameborder = "0";
      iframe.width = "160";
      iframe.height = "90";
      iframe.allowfullscreen = true;
      iframe.style.pointerEvents = "none";
      iframe.style.border = "none";
  
      // Create video title
      const videoTitle = document.createElement("span");
      videoTitle.classList.add("video-title");
  
      // Generate the episode number with leading zeros
      const episodeNumber = (i + 1).toString().padStart(2, "0");
  
      // Combine the series title and episode number
      videoTitle.textContent = "[WeebVoice] " + seriesTitle + "-" + episodeNumber;
  
      // Append elements to the video preview container
      videoPreview.appendChild(iframe);
      videoPreview.appendChild(videoTitle);
  
      // Append the video preview to the container
      videoPreviewsContainer.appendChild(videoPreview);
    }
  
    showVideos();
  
    // Load the initial link in the big-iframe
    if (initialLink) {
      bigIframe.src = initialLink;
    }
  }
  
  function showVideos() {
    const startIndex = (currentPage - 1) * videosPerPage;
    const endIndex = startIndex + videosPerPage;
  
    const videoPreviews = Array.from(videoPreviewsContainer.children);
  
    for (let i = 0; i < videoPreviews.length; i++) {
      if (i >= startIndex && i < endIndex) {
        videoPreviews[i].classList.remove("hidden");
      } else {
        videoPreviews[i].classList.add("hidden");
      }
    }
  
    updatePagination();
  }
  
  function updatePagination() {
    const totalPages = Math.ceil(links.length / videosPerPage);
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";
  
    if (totalPages > 1) {
      const pageNumbers = document.createElement("div");
      pageNumbers.classList.add("page-numbers");
      pageNumbers.style.margin = "20px 0";
  
      if (currentPage > 1) {
        const prevPage = document.createElement("button");
        prevPage.classList.add("page-number");
        prevPage.textContent = "Prev";
        prevPage.addEventListener("click", function () {
          goToPage(currentPage - 1);
        });
        pageNumbers.appendChild(prevPage);
      }
  
      const maxDisplayedPages = 3; // Maximum number of page buttons to display
      let startPage, endPage;
  
      if (currentPage <= Math.ceil(maxDisplayedPages / 2)) {
        startPage = 1;
        endPage = Math.min(maxDisplayedPages, totalPages);
      } else if (currentPage >= totalPages - Math.floor(maxDisplayedPages / 2)) {
        startPage = totalPages - maxDisplayedPages + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - Math.floor(maxDisplayedPages / 2);
        endPage = currentPage + Math.ceil(maxDisplayedPages / 2) - 1;
      }
  
      for (let i = startPage; i <= endPage; i++) {
        const pageNumber = document.createElement("button");
        pageNumber.classList.add("page-number");
        pageNumber.textContent = i;
        pageNumber.addEventListener("click", function () {
          goToPage(i);
        });
        if (i === currentPage) {
          pageNumber.style.backgroundColor = "#ff1a00"; // Set the current page button color
          pageNumber.style.color = "#ffffff"; // Set the current page button text color
        }
        pageNumbers.appendChild(pageNumber);
      }
  
      if (currentPage < totalPages) {
        const nextPage = document.createElement("button");
        nextPage.classList.add("page-number");
        nextPage.textContent = "Next";
        nextPage.addEventListener("click", function () {
          goToPage(currentPage + 1);
        });
        pageNumbers.appendChild(nextPage);
      }
  
      pagination.appendChild(pageNumbers);
      prevButton.disabled = currentPage === 1;
    }
  }
  
  function goToPage(page) {
    currentPage = page;
    showVideos();
  }
  
  prevButton.addEventListener("click", function () {
    if (currentPage > 1) {
      currentPage--;
      showVideos();
    }
  });
  
  function changeIframeSource(link) {
    bigIframe.src = link;
  }
