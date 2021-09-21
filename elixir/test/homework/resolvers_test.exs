defmodule Homework.ResolversTest do

  use Homework.DataCase
  alias HomeworkWeb.Resolvers.MerchantsResolver
  alias Homework.Merchants
  alias Homework.Merchants.Merchant
  alias HomeworkWeb.Resolvers.TransactionsResolver
  alias Homework.Users
  alias Homework.Users.User
  alias HomeworkWeb.Resolvers.UsersResolver
  alias HomeworkWeb.Resolvers.CompaniesResolver
  alias Homework.Companies
  alias Homework.Companies.Company

  describe "resolvers" do

    #TODO: rewrite so that this follows assert {:ok, %Object{} = object} = Objects.create(params) format instead of using elem(Objects, 1)
    #TODO: write a setup so that variables can be easily pulled, instead of writing out each variable

    # Merchant Resolver Tests
    test "get all merchants" do
      merchant = MerchantsResolver.create_merchant(nil,%{description: "some description", name: "some name"},%{})
      all_merchants = MerchantsResolver.merchants(nil,nil,%{})
      assert elem(all_merchants,1) == [elem(merchant,1)]
    end

    test "create new merchant and validate attributes" do
      merchant = MerchantsResolver.create_merchant(nil,%{description: "some description", name: "some name"},%{})
      merchant_value = elem(merchant, 1)
      assert merchant_value.description == "some description"
      assert merchant_value.name == "some name"
      assert merchant_value.id != nil
      assert merchant_value.updated_at != nil
      assert merchant_value.inserted_at != nil
    end

    test "update merchant with new valid attributes" do
      merchant = MerchantsResolver.create_merchant(nil,%{description: "some description", name: "some name"},%{})
      merchant_updated = MerchantsResolver.update_merchant(nil,%{name: "some updated name", description: "some updated description", id: elem(merchant,1).id},%{})
      assert elem(merchant_updated,1).description == "some updated description"
      assert elem(merchant_updated,1).name == "some updated name"
      assert elem(merchant_updated,1).id != nil
      assert elem(merchant_updated,1).updated_at != nil
      assert elem(merchant_updated,1).inserted_at != nil
    end

    test "delete merchant" do
      merchant = MerchantsResolver.create_merchant(nil,%{description: "some description", name: "some name"},%{})
      delete_merchant_result = MerchantsResolver.delete_merchant(nil, elem(merchant,1),%{})
      assert elem(merchant,1).description ==  elem(delete_merchant_result,1).description
      assert elem(merchant,1).name == elem(delete_merchant_result,1).name
      assert elem(merchant,1).id == elem(delete_merchant_result,1).id
      assert elem(merchant,1).updated_at == elem(delete_merchant_result,1).updated_at
      assert elem(merchant,1).inserted_at == elem(delete_merchant_result,1).inserted_at
    end

    # Company Resolver Tests
    test "get all companies" do
      company = CompaniesResolver.create_company(nil,%{name: "some name", credit_line: 123},%{})
      all_companies = CompaniesResolver.companies(nil,nil,%{})
      assert elem(all_companies,1) == [elem(company,1)]
    end

    test "create new company and validate attributes" do
      company = CompaniesResolver.create_company(nil,%{name: "some name", credit_line: 123},%{})
      company_value = elem(company, 1)
      assert company_value.name == "some name"
      assert company_value.id != nil
      assert company_value.updated_at != nil
      assert company_value.inserted_at != nil
    end

    test "update company with new valid attributes" do
      company = CompaniesResolver.create_company(nil,%{name: "some name", credit_line: 123},%{})
      company_updated = CompaniesResolver.update_company(nil,%{name: "some updated name", id: elem(company,1).id, credit_line: 321},%{})
      assert elem(company_updated,1).name == "some updated name"
      assert elem(company_updated,1).id != nil
      assert elem(company_updated,1).updated_at != nil
      assert elem(company_updated,1).inserted_at != nil
    end

    test "delete company" do
      company = CompaniesResolver.create_company(nil,%{name: "some name", credit_line: 123},%{})
      delete_company_result = CompaniesResolver.delete_company(nil, elem(company,1),%{})
      assert elem(company,1).name == elem(delete_company_result,1).name
      assert elem(company,1).id == elem(delete_company_result,1).id
      assert elem(company,1).updated_at == elem(delete_company_result,1).updated_at
      assert elem(company,1).inserted_at == elem(delete_company_result,1).inserted_at
    end

    # User Resolver Tests
    test "get all users" do
      assert {:ok, %Company{} = company} = Companies.create_company(%{name: "some name", credit_line: 123})
      user = UsersResolver.create_user(nil, %{first_name: "some first_name", last_name: "some last_name", dob: "some dob", company_id: company.id}, %{})
      all_users = UsersResolver.users(nil,nil,%{})
      assert elem(all_users,1) == [elem(user,1)]
    end

    test "create new user and validate attributes" do
      assert {:ok, %Company{} = company} = Companies.create_company(%{name: "some name", credit_line: 123})
      user = UsersResolver.create_user(nil, %{first_name: "some first_name", last_name: "some last_name", company_id: company.id}, %{})
      user_value = elem(user,1)
      assert user_value.first_name == "some first_name"
      assert user_value.last_name == "some last_name"
      assert user_value.company_id == company.id
      assert user_value.id != nil
      assert user_value.updated_at != nil
      assert user_value.inserted_at != nil
    end

    test "update user with new valid attributes" do
      assert {:ok, %Company{} = company1} = Companies.create_company(%{name: "some name", credit_line: 123})
      assert {:ok, %Company{} = company2} = Companies.create_company(%{name: "some other name", credit_line: 321})
      user = UsersResolver.create_user(nil, %{first_name: "some first_name", last_name: "some last_name", company_id: company1.id}, %{})
      user_updated = UsersResolver.update_user(nil,%{id: elem(user,1).id, first_name: "some updated first_name", last_name: "some updated last_name", company_id: company2.id, credit_line: 321},%{})
      user_updated_value = elem(user_updated,1)
      assert user_updated_value.first_name == "some updated first_name"
      assert user_updated_value.last_name == "some updated last_name"
      assert user_updated_value.company_id == company2.id
      assert user_updated_value.id != nil
      assert user_updated_value.updated_at != nil
      assert user_updated_value.inserted_at == user_updated_value.inserted_at
    end

    test "delete user" do
      assert {:ok, %Company{} = company1} = Companies.create_company(%{name: "some name", credit_line: 123})
      user = UsersResolver.create_user(nil, %{first_name: "some first_name", last_name: "some last_name", company_id: company1.id}, %{})
      delete_user_result = UsersResolver.delete_user(nil, elem(user,1),%{})
      assert elem(user,1).first_name == elem(delete_user_result,1).first_name
      assert elem(user,1).last_name == elem(delete_user_result,1).last_name
      assert elem(user,1).company_id == elem(delete_user_result,1).company_id
      assert elem(user,1).id == elem(delete_user_result,1).id
      assert elem(user,1).updated_at == elem(delete_user_result,1).updated_at
      assert elem(user,1).inserted_at == elem(delete_user_result,1).inserted_at
    end


    # Transaction Resolver Tests
    test "get all transactions" do
      assert {:ok, %Company{} = company} = Companies.create_company(%{name: "some name", credit_line: 123})
      assert {:ok, %User{} = user} = Users.create_user(%{first_name: "some first_name", last_name: "some last_name", dob: "some dob", company_id: company.id})
      assert {:ok, %Merchant{} = merchant} = Merchants.create_merchant(%{description: "some updated description", name: "some updated name"})
      transaction = TransactionsResolver.create_transaction(nil, %{amount: 1, credit: true, debit: false, description: "some description", user_id: user.id, company_id: company.id, merchant_id: merchant.id}, %{})
      all_transactions = TransactionsResolver.transactions(nil,nil,%{})
      assert elem(all_transactions,1) == [elem(transaction,1)]
    end

    test "create transaction and validate attributes" do
      assert {:ok, %Company{} = company} = Companies.create_company(%{name: "some name", credit_line: 123})
      assert {:ok, %User{} = user} = Users.create_user(%{first_name: "some first_name", last_name: "some last_name", dob: "some dob", company_id: company.id})
      assert {:ok, %Merchant{} = merchant} = Merchants.create_merchant(%{description: "some updated description", name: "some updated name"})
      transaction = TransactionsResolver.create_transaction(nil, %{amount: 1, credit: true, debit: false, description: "some description", user_id: user.id, company_id: company.id, merchant_id: merchant.id}, %{})
      transaction_value = elem(transaction,1)
      assert transaction_value.amount == 1
      assert transaction_value.credit == true
      assert transaction_value.debit == false
      assert transaction_value.description == "some description"
      assert transaction_value.user_id == user.id
      assert transaction_value.company_id == company.id
      assert transaction_value.merchant_id == merchant.id
      assert transaction_value.updated_at != nil
      assert transaction_value.inserted_at != nil
      assert transaction_value.id != nil
    end

    test "update transaction with new valid attributes" do
      assert {:ok, %Company{} = company1} = Companies.create_company(%{name: "some name", credit_line: 123})
      assert {:ok, %User{} = user1} = Users.create_user(%{first_name: "some first_name", last_name: "some last_name", dob: "some dob", company_id: company1.id})
      assert {:ok, %Merchant{} = merchant1} = Merchants.create_merchant(%{description: "some updated description", name: "some updated name"})
      assert {:ok, %Company{} = company2} = Companies.create_company(%{name: "some updated name", credit_line: 321})
      assert {:ok, %User{} = user2} = Users.create_user(%{first_name: "some updated first_name", last_name: "some updated last_name", dob: "some updated dob", company_id: company2.id})
      assert {:ok, %Merchant{} = merchant2} = Merchants.create_merchant(%{description: "some updated description", name: "some updated name"})
      transaction = TransactionsResolver.create_transaction(nil, %{amount: 1, credit: true, debit: false, description: "some description", user_id: user1.id, company_id: company1.id, merchant_id: merchant1.id}, %{})
      transaction_value = elem(transaction,1)
      transaction_updated = TransactionsResolver.update_transaction(nil, %{id: transaction_value.id, amount: 2, credit: false, debit: true, description: "some updated description", user_id: user2.id, company_id: company2.id, merchant_id: merchant2.id},%{})
      transaction_updated_value = elem(transaction_updated,1)
      assert transaction_updated_value.amount == 2
      assert transaction_updated_value.credit == false
      assert transaction_updated_value.debit == true
      assert transaction_updated_value.description == "some updated description"
      assert transaction_updated_value.user_id == user2.id
      assert transaction_updated_value.company_id == company2.id
      assert transaction_updated_value.merchant_id == merchant2.id
      assert transaction_updated_value.updated_at != nil
      assert transaction_updated_value.inserted_at == elem(transaction,1).inserted_at
      assert transaction_updated_value.id == elem(transaction,1).id
    end

    test "delete transaction" do
      assert {:ok, %Company{} = company1} = Companies.create_company(%{name: "some name", credit_line: 123})
      assert {:ok, %User{} = user1} = Users.create_user(%{first_name: "some first_name", last_name: "some last_name", dob: "some dob", company_id: company1.id})
      assert {:ok, %Merchant{} = merchant1} = Merchants.create_merchant(%{description: "some updated description", name: "some updated name"})
      transaction = TransactionsResolver.create_transaction(nil, %{amount: 1, credit: true, debit: false, description: "some description", user_id: user1.id, company_id: company1.id, merchant_id: merchant1.id}, %{})
      delete_transaction_result = TransactionsResolver.delete_transaction(nil, elem(transaction,1),%{})
      transaction_value = elem(transaction,1)
      assert transaction_value.amount == elem(delete_transaction_result,1).amount
      assert transaction_value.credit == elem(delete_transaction_result,1).credit
      assert transaction_value.debit == elem(delete_transaction_result,1).debit
      assert transaction_value.description == elem(delete_transaction_result,1).description
      assert transaction_value.user_id == elem(delete_transaction_result,1).user_id
      assert transaction_value.company_id == elem(delete_transaction_result,1).company_id
      assert transaction_value.merchant_id == elem(delete_transaction_result,1).merchant_id
      assert transaction_value.updated_at == elem(delete_transaction_result,1).updated_at
      assert transaction_value.inserted_at == elem(delete_transaction_result,1).inserted_at
      assert transaction_value.id == elem(delete_transaction_result,1).id
    end



  end

end
