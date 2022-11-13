const time={}

time.fechaFormato = (aDate) => {
  if(!aDate) return null
  else {
    const completo=new Date(aDate);
    completo.setDate(completo.getDate() +1 );
    
//      const completo=(new Date(aDate)).toISOString().split('T')[0];
    const dia = `${(completo.getDate())}`.padStart(2,'0');
    const mes = `${(completo.getMonth()+1)}`.padStart(2,'0');
    const ano = completo.getFullYear();

    return dia+'-'+mes+'-'+ano;
//        return dateFormat(aDate, 'dd-mm-yyyy')
  }
}

module.exports=time;