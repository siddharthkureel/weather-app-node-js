const weatherForm = document.querySelector('form');
const search = document.getElementById('search');

weatherForm.addEventListener('submit',async(e)=>{
    e.preventDefault();
    await fetch(`/weather/?address=${search.value}`)
        .then(response => response.json())
        .then(data => {
            if(data.error){
                document.getElementById('error').style.display = 'initial';
                document.getElementById('error').innerHTML = data.error;
            }else{
                document.getElementById('location').innerHTML = data.location;
                document.getElementById('address').innerHTML = data.address;
                document.getElementById('weather').innerHTML = data.weather;
                
            }
        })
    search.value = '';
    setTimeout(() => {
        document.getElementById('error').style.display = 'none';
    }, 1500);
})