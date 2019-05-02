document.addEventListener('DOMContentLoaded', function () {
    //Use the Fetch API
    fetch('data.json')
        .then(data => data.json())
        .then(result => {
            speakersTemplate(result.speakers);
            conferenceTemplate(result.conferences);
            addFiltering();
        });

    conferenceTemplate = conferences => {
       console.log(conferences);
        const days = Object.keys(conferences).map(days => days);
        //console.log(days);
        days.forEach(day => {
            let element = document.querySelector(`#${day}`);
            conferences[day].forEach(conference => {
                //this creates the div with the workshop info
                const conferenceDiv = document.createElement('div');
                conferenceDiv.classList.add(`${conference.category}-cat`, 'mix');
                
                const liContainer = document.createElement('li');
                conferenceDiv.appendChild(liContainer);

                liContainer.classList.add('list-group-item', 'list-group-item-action', 'd-flex', 'conference-wapper', 'align-item-center');
                liContainer.innerHTML =`
                <div class="image">
                    <img src="img/speaker_${conference.speaker_id}_sq.jpg" class="img-fluid rounded-circle">
                  </div>
                <div class="conference-info">
                    <p class="mb-1 time">
                    <span class="badge badge-primary"> ${conference.time}</span>
                     ${conference.workshop ? `<span class="badge badge-danger">Workshop</span>` : ``}
                    </p>
                    <p class="mb-1 title"> ${conference.title}</p>
                    <p class="mb-1 discription"> ${conference.description}</p>
                     <p class="speaker">By:<span>${conference.speaker}</span></p>
                </div>
                `;
                element.appendChild(conferenceDiv);
            })
        })
    }



    speakersTemplate = speakers => {
        const speakerList = document.querySelector('.speaker-list');
        speakers.forEach((speaker, index) => {
            //Increase by 12, to match the image name
            let id = index + 1;

            //create the htlm strucure
            const speakerHTML = document.createElement('li');
            // add some classes
            speakerHTML.classList.add('col-sm-6', 'col-lg-3');
            //build the HTML
            speakerHTML.innerHTML = `<div class="speaker-image">
                <img src="img/speaker_${id}.jpg" class="img-fluid">
            </div>
            <div class="speaker-info py-3 text-center">
                <h3 class="text-uppercase">${speaker.name}</h3>
                <p>${speaker.description}</p>
            </div>`;

            speakerList.appendChild(speakerHTML);
        });
    }
    //Smooth scroll
    const scroll = new SmoothScroll('a[href*="#"]', {
        //smooth scroll options 
        speed : 1000, 
        updateURL: false,
        //offset: 100
    });
    //Fixed Navigation on top
    const navigation = document.querySelector('.main-navigation'),
        siteHeader = document.querySelector('.site-header');
    const fixedNavigation = () =>{
        if (window. innerWidth > 768){
            // console.log(siteHeader.clientHeight);
       window.onscroll = () => {
           //console.log(window.scrollY);
           if(window.scrollY > siteHeader.clientHeight){
               //console.log('Yes you scroll enough');
               navigation.classList.add('fixed-top');
               navigation.classList.remove('pt-md-5');
           } else if(window.scrollY === 0) {
               //console.log('Not yet!!');
               navigation.classList.remove('fixed-top');
               navigation.classList.add('pt-md-5');
               }
           }
       }else{
           navigation.classList.remove('fixed-top');
       }
    }
    fixedNavigation();
    window.addEventListener('resize', function(){
        fixedNavigation();
    });
         
        // toggle mobile menu
        const mobileIcon = document.querySelector('.mobile-menu i');
        mobileIcon.addEventListener('click', function() {
            if(navigation.classList.contains('moblie-active')){
                navigation.classList.remove('d-flex', 'mobile-active', 'fixed-top');
                return;
            }
            // display the menu for mobile devices
            //console.log('You clicked the button!!');
            navigation.classList.add('d-flex', 'mobile-active','fixed-top');
        });

    //Adds Filtering
    const addFiltering = () => {
        let workshopList = document.querySelector('#workshop');
        mixitup(workshopList)
    }
    
    //  Animation for numbers count numbers
    set Timeout(() =>{
    const conferenceContainer = document.querySelector('#conference-total');
                                            //element, start Number, end Number, decimal, duration sec
    const conferenceAnimation = new CountUp (conferenceContainer, 0, 12, 0, 5);
    conferenceAnimation.start();

    const workshopsContainer = document.querySelector('#workshops-total');
    const workshopsAnimation = new CountUp (workshopsContainer, 0, 4, 0, 3);
    workshopsAnimation.start();
    const daysContainer = document.querySelector('#days-total');
    const daysAnimation = new CountUp (daysContainer, 0, 2, 0, 2);
    daysAnimation.start();

    }, 500);
});