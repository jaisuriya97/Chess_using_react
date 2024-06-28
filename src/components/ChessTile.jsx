import React from 'react'

function ChessTile({keys,num,img,name}) {
  if(num%2 === 0){
    return (<div className='tile black-tile'>
       {img === undefined ? "": (<div className='tile-piece' name={name} key = {keys}style={{backgroundImage:`url(${img})`}}/>) }
    </div>)
  }else{
    return (<div className='tile white-tile'>
        {img === undefined ? "": (<div className='tile-piece' key = {keys}style={{backgroundImage:`url(${img})`}}/>) }</div>)
  }
}

export default ChessTile