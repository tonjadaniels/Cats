class Api::CatsController < ApplicationController

  def index
    @cats = Cat.all
    render "index.json.jbuilder"  
  end

  def show
    cat_id = params[:id]
    @cat = Cat.find(cat_id)
    render "show.json.jbuilder" 
  end

  def create
    @cat = Cat.new(
      name: params[:name],
      breed: params[:breed],
      age: params[:age],
      registry: params[:registry],
      image: params[:image]
      )
    @cat.save
    render "show.json.jbuilder"
  end

  def update
    cat_id = params[:id]
    @cat = Cat.find(cat_id)

    @cat.name = params[:name] || @cat.name
    @cat.breed = params[:breed] || @cat.breed
    @cat.age = params[:age] || @cat.age
    @cat.registry = params[:registry] || @cat.registry
    @cat.image = params[:registry] || @cat.image

    @cat.save
    render "show.json.jbuilder"
  end

  def destroy
    cat_id = params[:id]
    @cat = Cat.find(cat_id)
    @cat.destroy
    render json:{message: "Cat successfully eliminated."}
  end
  
end
