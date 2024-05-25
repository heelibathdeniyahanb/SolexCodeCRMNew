import React, { useState } from 'react';

const SurveyForm = () => {
  const [ratings, setRatings] = useState({
    userExperience: 0,
    speedPerformance: 0,
    support: 0,
    security: 0,
  });

  const [scalability, setScalability] = useState('');
  const [navigation, setNavigation] = useState('');
  const [crmUsage, setCrmUsage] = useState('');
  const [additionalFeedback, setAdditionalFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false); // State for controlling message box visibility
  
  const handleRatingChange = (e, category) => {
    setRatings({
      ...ratings,
      [category]: parseInt(e.target.value),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ensure all ratings are selected and other required fields are filled
    const allRatingsSelected = Object.values(ratings).every((rating) => rating !== 0);
    if (allRatingsSelected && navigation && crmUsage) {
      // Submit form logic
      console.log({ ratings, scalability, navigation, crmUsage, additionalFeedback });
      setSubmitted(true); // Show message box
    } else {
      alert('Please answer all questions before submitting.');
    }
  };

  return (
    <div className="max-w-2xl p-8 mx-auto mt-10 bg-white border border-gray-300 rounded-lg shadow-md">
      <h2 className="mb-6 text-2xl font-semibold text-center text-[#294D61]">We would love your feedback..........</h2>
      <form onSubmit={handleSubmit}>

        {['userExperience', 'speedPerformance', 'support', 'security'].map((category, index) => (
          <div key={category} className="mb-6">
            <label className="block mb-2 text-lg text-[#0d2acc]">
              {index + 1}. {category === 'userExperience' && 'How would you rate the overall user experience with our CRM system?'}
              {category === 'speedPerformance' && 'How satisfied are you with the speed and performance of the CRM system?'}
              {category === 'support' && 'How satisfied are you with the level of support provided by our team?'}
              {category === 'security' && 'How confident are you in the security measures employed by the CRM system to protect your data?'}
            </label>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <label key={num} className="flex items-center text-[#000000] hover:bg-[#0d2accbb]">
                  <input
                    type="radio"
                    value={num}
                    checked={ratings[category] === num}
                    onChange={(e) => handleRatingChange(e, category)}
                    className="text-blue-500 form-radio"
                    required
                  />
                  <span className="ml-1">{num}</span>
                </label>
              ))}
            </div>
            <div className="flex justify-between mt-1 text-sm text-gray-600">
              <span>Disagree</span>
              <span>Agree</span>
            </div>
          </div>
        ))}

        <div className="mb-6">
          <label className="block mb-2 text-lg">
            5. Have you experienced any limitations in terms of scalability? <span className="text-sm italic text-[#0d2acc]">(Optional)</span>
          </label>
          <textarea
            value={scalability}
            onChange={(e) => setScalability(e.target.value)}
            className="w-full h-20 p-3 border border-gray-300 rounded-lg bg-[#325e759c]]"
            placeholder="Please provide your response"
          />
        </div>

        {['navigation', 'crmUsage'].map((question, index) => (
          <div key={question} className="mb-6">
            <label className="block mb-2 text-lg text-[#0d2acc] " >
              {index + 6}. {question === 'navigation' && 'Were you able to navigate the system easily?'}
              {question === 'crmUsage' && 'Were you able to effectively use the CRM app?'}
            </label>
            <div className="flex items-center space-x-4 ">
              <label className="flex items-center hover:bg-[#0d2accbb]">
                <input
                  type="radio"
                  value="yes"
                  checked={question === 'navigation' ? navigation === 'yes' : crmUsage === 'yes'}
                  onChange={(e) => question === 'navigation' ? setNavigation(e.target.value) : setCrmUsage(e.target.value)}
                  className="text-blue-500 form-radio"
                  required
                />
                <span className="ml-1">Yes</span>
              </label>
              <label className="flex items-center hover:bg-[#0d2accbb]">
                <input
                  type="radio"
                  value="no"
                  checked={question === 'navigation' ? navigation === 'no' : crmUsage === 'no'}
                  onChange={(e) => question === 'navigation' ? setNavigation(e.target.value) : setCrmUsage(e.target.value)}
                  className="text-blue-500 form-radio"
                  required
                />
                <span className="ml-1">No</span>
              </label>
            </div>
          </div>
        ))}

        <div className="mb-6">
          <label className="block mb-2 text-lg ">Is there anything else we can do to improve this feature?</label>
          <textarea
            value={additionalFeedback}
            onChange={(e) => setAdditionalFeedback(e.target.value)}
            className="w-full h-32 p-3 border border-gray-300 rounded-lg bg-[#57a2ca43]"
            placeholder="Please provide your response"
          />
        </div>

        <div className="flex justify-center">
          <button type="submit" className="px-8 py-2 font-semibold text-white bg-[#294D61] rounded-lg hover:bg-[#213a48]">SUBMIT</button>
        </div>

        {/* Message box */}
        {submitted && (
          <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
            <div className="p-8 bg-white rounded-lg shadow-md">
              <p className="text-xl text-center">Thanks for your response!</p>
              <button onClick={() => setSubmitted(false)} className="block px-4 py-2 mx-auto mt-4 text-white bg-[#294D61] rounded-lg">Close</button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default SurveyForm;
