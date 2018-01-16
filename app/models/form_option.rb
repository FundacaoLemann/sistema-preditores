class FormOption < ApplicationRecord
  FORM_ASSEMBLY_EQUIVALENT = {
    'A' => "tfa_63=1",
    'B' => "tfa_64=1",
    'C' => "tfa_65=1",
    'D' => "tfa_66=1",
    'E' => "tfa_2567=1",
    'F' => "tfa_2568=1"
  }.freeze

  FORM_NAMES = [
    ['Basline', 'baseline'],
    ['Follow up','follow_up'],
    ['Opção 3', 'option_three'],
    ['Opção 4', 'option_four'],
    ['Opção 5', 'option_five']
  ]

  FORM_NAMES_HASH = {
    baseline: 'Baseline',
    follow_up: 'Follow up',
    option_three: 'Opção 3',
    option_four: 'Opção 4',
    option_five: 'Opção 5'
  }

  # active admin related changes, can't put as private
  # remove extra blank item from active admin
  def sections_to_show=(items)
    items.delete("")
    super items
  end

  def sections_to_form_assembly_params
    fa_params = ''
    sections_to_show.each do |section|
      fa_params << FORM_ASSEMBLY_EQUIVALENT[section] << '&'
    end
    fa_params
  end

  def name_state_or_city
    state_or_city.length > 2 ? name_city : name_state
  end

  def form_name_parsed
    FORM_NAMES_HASH[form_name.to_sym]
  end

  private

  def name_city
    city = City.find_by(ibge_code: state_or_city)
    state_or_city << ' - ' << city.name unless city.nil?
  end

  def name_state
    state = State.find_by(id: state_or_city)
    state_or_city << ' - ' << state.name unless state.nil?
  end
end
