function FilterData(Data, selectedBrand) {
  const filterData = selectedBrand ? Data.filter(item => item.company === selectedBrand) : Data

  return filterData
}

export default FilterData