import { cmp, File, Code } from '@voxgig/sdkgen';

const Quick = cmp(function Quick_ruby(props: any) {
  const { build } = props;
  const { model } = props.ctx$;

  File({ name: "quick." + "rb" }, () => {
    Code(`
require 'dotenv'
Dotenv.load
require_relative '../lib/${model.name}_sdk'

def run
  client = ${model.Name}SDK::Client.new(
    {
      endpoint: ENV['${model.NAME}_ENDPOINT'],
      apikey: ENV['${model.NAME}_APIKEY']
    }
  )

  # Test listing assets
  out = client.Geofence.list()
  puts "Geofence.list: #{out.inspect}"

  # Test loading an asset
  out = client.Geofence.load({id: 1})
  puts "Geofence.load: #{out.inspect}"

  # Check if endpoint includes localhost 
  if ENV['${model.NAME}_ENDPOINT'].include? 'localhost'
    # Test creating an asset
    out = client.Geofence.create({
      id: 'CF49B47C-317B-4387-83C3-4A23715B1C45',
      name: 'Geofence 1',
      desc: 'Geofence 1 description',
      custom: { foo: 'bar' },
      extent_id: 'CF49B47C-317B-4387-83C3-4A23715B1C45'
    })
    puts "Geofence.create: #{out.inspect}"
  
    # Test updating an asset
    out = client.Geofence.save({
      id: 'CF49B47C-317B-4387-83C3-4A23715B1C45',
      name: 'Geofence 1',
      desc: 'Geofence 1 description',
      custom: { foo: 'bar' },
      extent_id: 'CF49B47C-317B-4387-83C3-4A23715B1C45'
    })
    puts "Geofence.save: #{out.inspect}"
  end
end

run

`);
  });
});

export { Quick };