$(document).ready(function () {
  // Function to fetch and render all pharmacies
  function fetchAndRenderPharmacies() {
    $.get("http://localhost:3000/fetchAllPharmacies", function (data) {
      renderPharmacyData(data);
    });
  }

  // Function to render pharmacy data
  function renderPharmacyData(pharmacies) {
    const pharmacyList = $("#pharmacy-list");

    pharmacyList.empty(); // Clear previous data before rendering

    pharmacies.forEach((pharmacy) => {
      const pharmacyDiv = $("<div>").addClass("pharmacy-item");
      pharmacyDiv.append($("<p>").text(`Name: ${pharmacy.pharmacyName}`));
      pharmacyDiv.append(
        $("<p>").text(`Pharmacist: ${pharmacy.pharmacistName}`)
      );
      pharmacyDiv.append($("<p>").text(`Income: ${pharmacy.income}`));

      const editBtn = $("<button>").text("Edit").addClass("edit-btn");
      const deleteBtn = $("<button>").text("Delete").addClass("delete-btn");

      editBtn.click(() => handleEdit(pharmacy._id));
      deleteBtn.click(() => handleDelete(pharmacy._id));

      pharmacyDiv.append(editBtn);
      pharmacyDiv.append(deleteBtn);

      pharmacyList.append(pharmacyDiv);
    });
  }

  // Function to handle adding a new pharmacy
  function addPharmacy() {
    const name = prompt("Enter pharmacy name:");
    const pharmacistName = prompt("Enter pharmacist's name:");
    const income = prompt("Enter income:");

    const newPharmacy = {
      pharmacyName: name,
      pharmacistName: pharmacistName,
      income: income,
    };

    $.post("http://localhost:3000/addPharmacy", newPharmacy, function () {
      fetchAndRenderPharmacies();
    });
  }

  // Function to handle editing a pharmacy
  function handleEdit(pharmacyId) {
    const newName = prompt("Enter new pharmacy name:");
    const newPharmacistName = prompt("Enter new pharmacist's name:");
    const newIncome = prompt("Enter new income:");

    const updatedPharmacy = {
      pharmacyName: newName,
      pharmacistName: newPharmacistName,
      income: newIncome,
    };

    $.ajax({
      url: `http://localhost:3000/editPharmacy/${pharmacyId}`,
      type: "PUT",
      data: updatedPharmacy,
      success: function () {
        fetchAndRenderPharmacies();
      },
    });
  }

  // Function to handle deleting a pharmacy
  function handleDelete(pharmacyId) {
    $.ajax({
      url: `http://localhost:3000/deletePharmacy/${pharmacyId}`,
      type: "DELETE",
      success: function () {
        fetchAndRenderPharmacies();
      },
    });
  }

  // Function to handle viewing all pharmacies
  function viewAllPharmacies() {
    fetchAndRenderPharmacies();
  }

  // Function to handle updating pharmacy details
  function updatePharmacyDetails() {
    alert("Implement logic for updating pharmacies here.");
    // Add logic to handle updating pharmacies
  }

  // Function to handle deleting a pharmacy
  function deletePharmacy() {
    alert("Implement logic for deleting pharmacies here.");
    // Add logic to handle deleting pharmacies
  }

  // Event listeners for buttons
  $("#addPharmacyBtn").click(addPharmacy);
  $("#updatePharmacyBtn").click(updatePharmacyDetails);
  $("#deletePharmacyBtn").click(deletePharmacy);
  $("#viewAllPharmacyBtn").click(viewAllPharmacies);

  // Initial fetch and render of pharmacies on page load
  fetchAndRenderPharmacies();
});
