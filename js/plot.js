chart = 'scatterplot'
/********************************* Function to display chaart configutations **********************************/
function display_properties(props){
    var form = ''

    for(var i = 0; i < props.length; i++){
        prop_name = props[i]['name']
        prop_field = props[i]['field']
        prop_desc = props[i]['desc']

        var each_conf = `<div class="each-conf">
                                <div class="conf-label"> ${ prop_name } </div>
                                <div class="conf-desc"> ${prop_desc } </div>`
        console.log()
        
        if(prop_field == 'select'){
            var input = `<select id="value_${prop_name}"> `
            if(props[i]['values'] == 'columns'){
                columns = JSON.parse(localStorage['columns'])
            }else if(props[i]['values'] == 'colors'){
                columns = colors
            }else{
                columns = props[i]['values']
            }

            for(var j = 0;  j < columns.length; j++){
                input = input + `<option value="${columns[j]}"> ${columns[j]} </option>`
            }

            input = input + "</select>"

        }else if(prop_field == 'text'){
            var input = `<input type="text" value="" />`
        }else if(prop_field == 'number'){
            min = props[i]['min']
            max = props[i]['max']
            step = props[i]['step']
            if(props[i]['type'] == 'MinMax'){
                var input = `<input type="number" class="half" min=${min} max=${max} step=${step} value="" id="value_${prop_name}" half='lower'/>
                        <input type="number" class="half" min=${min} max=${max} step=${step} value="" id="value_${prop_name}" half='upper'/>
                `
            }else{
                var input = `<input type="number" class="half" min=${min} max=${max} step=${step} value="" id="value_${prop_name}"/>`  
            }
        }

        each_conf = each_conf + input + "</div>"
        form = form + each_conf
    }

    
    $('.sub-conf')[0].innerHTML = form
}

/* Function to save dataset columns in local variable ***************************************************/
function set_dataset(df_name, columns){
    localStorage['columns'] = JSON.stringify(columns)
    localStorage['df_name'] = df_name
}


/*************** Function to get chart settings *********************************************************/
function get_config(props){
    settings = {}

    for(var i = 0; i < props.length; i++){
        prop_name = props[i]['name']
        prop_field = props[i]['field']
    
        if(prop_field == 'number'){
            if(props[i]['type'] == 'MinMax'){
                value = 3
            }
        }else{
            value = $('#value_'+prop_name).val()
        }
        
        settings.update()
    }

} 

$(document).ready(
    function(){
    // Save all the dataset column for use 
    set_dataset('nonesense', ['age', 'color', 'name', 'fish', 'tank', 'light'])

    // Listen to visual selection 
    $(document).on('click', '.each-chart', function(){
        // remove all highlight from charts
        $('.each-chart').removeClass('active')

        // highlight the selected chart
        $(this).addClass('active')

        // get the selected chart
        chart = $(this).attr('id')
        
        properties = $.getJSON('js/'+chart+'.json', function(props){
            display_properties(props)
        })
            
    })

    // Listen to plot request
    $(document).on('click', '#plot', function(){
        properties = $.getJSON('js/'+chart+'.json', function(props){
            get_config(props)
        })
    }) 
})
    