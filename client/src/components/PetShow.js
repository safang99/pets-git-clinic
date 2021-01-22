import React, { useState, useEffect } from "react"

const PetShow = props => {
  const [pet, setPet] = useState({
    name: "",
    available: "",
    weight: "",
    estimatedAge: "",
    applicants: []
  })

  const getPet = async () => {
    const petId = props.match.params.id
    try {
      const response = await fetch(`/api/v1/pets/${petId}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error)
      }
      const body = await response.json()
      setPet(body.pet)
    } catch(err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  useEffect(() => {
    getPet()
  }, [])

  const applicantListItems = pet.applicants.map(applicantObject => {
    return(
      <li>{applicantObject.firstName} {applicantObject.lastName}</li>
    )
  })

  let availabilitySection, weightSection, estimatedAgeSection
  if(pet.available) {
    availabilitySection = <p>This pet is available!</p>
  } else {
    availabilitySection = <p>This pet has already been adopted.</p>
  }
  if(pet.weight) {
    weightSection = <p>Weight: {weight} lbs</p>
  }
  if(pet.estimatedAge) {
    estimatedAgeSection = <p>Estimated Age: {estimatedAge}</p>
  }

  return(
    <div>
      <h1>{pet.name}</h1>
      {availabilitySection}
      {weightSection}
      {estimatedAgeSection}
      <hr />
      <h4>Applicants:</h4>
      <ul>
        {applicantListItems}
      </ul>
    </div>
  )
}

export default PetShow
