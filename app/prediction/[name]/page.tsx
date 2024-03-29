const getPredictedAge = async ( name: string ) => {
  const res = await fetch(`https://api.agify.io/?name=${name}`);
  return res.json();
}

const getPredictedGender = async ( name: string ) => {
  const res = await fetch(`https://api.genderize.io/?name=${name}`);
  return res.json();
}

const getPredictedCountry = async ( name: string ) => {
  const res = await fetch(`https://api.nationalize.io/?name=${name}`);
  return res.json();
}

interface Params {
  params: { name: string }
}

async function Page({ params }: Params) {
  const name = params.name;
  const ageData = getPredictedAge(name);
  const genderData = getPredictedGender(name);
  const countryData = getPredictedCountry(name);

  const [age, gender, country] = await Promise.all([ageData, genderData, countryData]);

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3 p-4">
      <div className="p-8">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
          Personal Info
        </div>
        <div className="block mt-1 text-lg leading-tight font-medium text-black">
          Age: {age?.age}
        </div>
        <div className="block mt-1 text-lg leading-tight font-medium text-black">
          Gender: {gender?.gender}
        </div>
        <div className="block mt-1 text-lg leading-tight font-medium text-black">
          Nationality: {country?.country[0]?.country_id}
        </div>
      </div>
    </div>
  )
}

export default Page