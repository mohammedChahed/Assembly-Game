import React from 'react'

const alphabets = [...Array(26)].map((_,index) =>
    String.fromCharCode(65 + index)
);

export default alphabets
