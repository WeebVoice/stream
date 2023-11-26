document.addEventListener("DOMContentLoaded", function () {
  const sIframe = document.getElementById("s-iframe");
  const videoPreviewsContainer = document.getElementById("video-previews");
  const prevButton = document.getElementById("prev-button");
  let currentPage = 1;
  const videosPerPage = 4;
  const maxDisplayedPages = 3; // Maximum number of page buttons to display

  // Read the last clicked link from the cookie
  const lastClickedLink = getCookie("s-link");

  // Load the initial link or the last clicked link in the s-iframe
  if (lastClickedLink) {
    sIframe.src = lastClickedLink;
  } else if (initialLink) {
    sIframe.src = initialLink;
  }

  // Function to change the source of sIframe
  function changeIframeSource(link) {
    sIframe.src = link;
    // Save the last clicked link in the cookie
    setCookie("s-link", link, 3); // Expires in 3 hours
  }

  // Function to generate video previews using post script data
  function generateVideoPreviews() {
    videoPreviewsContainer.innerHTML = "";

    // Calculate the maximum number of video previews to display
    const startIndex = (currentPage - 1) * videosPerPage;
    const endIndex = startIndex + videosPerPage;
    const maxPreviews = Math.min(links.length, endIndex);

    for (let i = startIndex; i < maxPreviews; i++) {
      const link = links[i];

      // Create video preview container
      const videoPreview = document.createElement("div");
      videoPreview.classList.add("video-preview");
      videoPreview.addEventListener("click", function () {
        changeIframeSource(link);
      });

      // Create video title
      const videoTitle = document.createElement("span");
      videoTitle.classList.add("video-title");

      // Generate the episode number with leading zeros
      const episodeNumber = (i + 1).toString().padStart(2, "0");

      // Combine the series title and episode number
      videoTitle.textContent =
        "[WeebVoice] " + seriesTitle + "-" + episodeNumber;

      // Create preview image
      const videoId = extractVideoId(link);
      const thumbnailLink = `https://drive.google.com/thumbnail?id=${videoId}`;
      const pImg = document.createElement("img");
      pImg.alt = videoTitle.textContent;
      pImg.src = thumbnailLink;
      pImg.id = "pImg";

      // Append elements to the video preview container
      videoPreview.appendChild(pImg);
      videoPreview.appendChild(videoTitle);

      // Append the video preview to the container
      videoPreviewsContainer.appendChild(videoPreview);
    }

    showVideos();
  }

  // Function to extract video ID from the Google Drive link
  function extractVideoId(link) {
    const match = link.match(/\/d\/(.*?)\//);
    return match ? match[1] : null;
  }

  function showVideos() {
    const totalPages = Math.ceil(links.length / videosPerPage);
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";

    if (totalPages > 1) {
      const pageNumbers = document.createElement("div");
      pageNumbers.classList.add("page-numbers");

      if (currentPage > 1) {
        const prevPage = document.createElement("button");
        prevPage.classList.add("page-number");
        prevPage.textContent = "Prev";
        prevPage.addEventListener("click", function () {
          goToPage(currentPage - 1);
        });
        pageNumbers.appendChild(prevPage);
      }

      let startPage, endPage;

      if (currentPage <= Math.ceil(maxDisplayedPages / 2)) {
        startPage = 1;
        endPage = Math.min(maxDisplayedPages, totalPages);
      } else if (
        currentPage >=
        totalPages - Math.floor(maxDisplayedPages / 2)
      ) {
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
          pageNumber.style.backgroundColor = "#ff492d"; // Set the current page button color
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
    generateVideoPreviews();
  }

  prevButton.addEventListener("click", function () {
    if (currentPage > 1) {
      currentPage--;
      generateVideoPreviews();
    }
  });

  // Call the function to generate initial video previews
  generateVideoPreviews();

  // Function to set a cookie
  function setCookie(name, value, hours) {
    const date = new Date();
    date.setTime(date.getTime() + hours * 60 * 60 * 1000);
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  }

  // Function to get a cookie value
  function getCookie(name) {
    const cname = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(";");

    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(cname) == 0) {
        return c.substring(cname.length, c.length);
      }
    }

    return null;
  }
});