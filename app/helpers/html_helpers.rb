module HtmlHelpers
  def link_to(text, url, attrs={})
    "<a#{render_attrs(attrs)} href='#{url}'>#{text}#{insert_ending(attrs, "</a>")}"
  end

  def form_tag(url, attrs={})
    "<form action='#{url}'#{render_attrs(attrs)}>#{insert_ending(attrs, "</form>")}"
  end

  def text_field_tag(attrs={})
    "<input type='text'#{render_attrs(attrs)}>"
  end

  def submit_tag(attrs={})
    "<input type='submit'#{render_attrs(attrs)}>"
  end

  def icon_tag(class_name, attrs={})
    "<i class='#{class_name}'#{render_attrs(attrs)}>#{insert_ending(attrs, "</i>")}"
  end

  def render_attrs(attrs)
    result = ""
    attrs.each do |k, v|
      result += " #{k}='#{v}'"
    end
    return result
  end

  def insert_ending(attrs, ending)
    (attrs[:end] == false) ? "" : ending
  end
end