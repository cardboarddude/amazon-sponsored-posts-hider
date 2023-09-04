function tryRemoveSponsored() {
  let sponsored = $('span:contains("Sponsored")');

  if (sponsored) {
    let parents = [];
    $(sponsored).each(function(index) {
      // console.log(`SPON_${index}`);
      let parent = $(this).closest('[data-cel-widget*="search_result_"]')
        .closest('[data-cel-widget*="search_result_"]');
      if (parent) {
        parents.push(parent);

        $(parent).html(`<button data-target="sponsored_${index}" 
        onclick="toggleAccordion(event)">Hide/Show Sponsored</button>
        <div id="sponsored_${index}" class="accordion">${$(parent).html()}</div>`);
      }
    });
    // console.log('DONE SPON');

    if (parents.length > 0) {
      console.log(`Hid ${sponsored.length} sponsored posts.`);
      
      for (let i = 0; i < parents.length; i++) {
        $(`#sponsored_${i}`).toggle();
        $(`#sponsored_${i}`).css('border', '3px dashed blue');
      }

      return true;
    }
  }

  return false;
}

function toggleAccordion(e) {
  $(`#${$(e.target).attr('data-target')}`).toggle();
}

function startRemoveSponsored() {
  // console.log('Trying!');
  let timeout = setTimeout(function() {
    if (!tryRemoveSponsored()) {
      console.log(`No sponsored posts found.`);
      startRemoveSponsored();
    } else {
      timeout = null;
      DONE = true;
    }
  }, 1500);
}
let DONE = false;
$('document').ready(function() {
  if (!DONE) {
    startRemoveSponsored();
  }
});



