import React from 'react';

const PeopleList = ({ people }) => {
  return (
    <div>
      {people.map((person) => (
        <div key={person._id}>
          {person.username}
        </div>
      ))}
    </div>
  );
};

export default PeopleList;