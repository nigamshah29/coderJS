require 'test_helper'

class ProjectsControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get projects_create_url
    assert_response :success
  end

  test "should get index" do
    get projects_index_url
    assert_response :success
  end

  test "should get dashboard" do
    get projects_dashboard_url
    assert_response :success
  end

  test "should get project_sprints" do
    get projects_project_sprints_url
    assert_response :success
  end

  test "should get project_requirements" do
    get projects_project_requirements_url
    assert_response :success
  end

end
